"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const socket_io_1 = require("socket.io");
const uuid_1 = require("uuid");
const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
console.log(`🔧 Starting Whizle server...`);
console.log(`📍 Port: ${port}`);
console.log(`🏗️  Development mode: ${dev}`);
console.log(`🌍 NODE_ENV: ${process.env.NODE_ENV}`);
console.log(`📦 Preparing Next.js app...`);
const nextApp = (0, next_1.default)({ dev });
const nextHandler = nextApp.getRequestHandler();
nextApp.prepare().then(async () => {
    console.log("✅ Next.js app prepared successfully");
    const app = (0, express_1.default)();
    const server = (0, http_1.createServer)(app);
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: process.env.NODE_ENV === "production"
                ? true
                : ["http://localhost:3000"],
            methods: ["GET", "POST"],
            credentials: true
        },
        transports: ["websocket", "polling"],
        pingTimeout: 60000,
        pingInterval: 25000,
        allowEIO3: true
    });
    app.get("/health", async (_, res) => {
        res.status(200).json({
            status: "healthy",
            timestamp: new Date().toISOString(),
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || "development",
            version: "1.0.0"
        });
    });
    app.get("/", (req, res) => {
        return nextHandler(req, res);
    });
    const rooms = new Map();
    const addMove = (roomId, socketId, move) => {
        const room = rooms.get(roomId);
        if (!room.users.has(socketId)) {
            room.usersMoves.set(socketId, [move]);
        }
        room.usersMoves.get(socketId).push(move);
    };
    const undoMove = (roomId, socketId) => {
        const room = rooms.get(roomId);
        room.usersMoves.get(socketId).pop();
    };
    io.on("connection", (socket) => {
        console.log(`🔌 Socket connected: ${socket.id}`);
        const getRoomId = () => {
            const joinedRoom = [...socket.rooms].find((room) => room !== socket.id);
            if (!joinedRoom)
                return socket.id;
            return joinedRoom;
        };
        const leaveRoom = (roomId, socketId) => {
            const room = rooms.get(roomId);
            if (!room)
                return;
            const userMoves = room.usersMoves.get(socketId);
            if (userMoves)
                room.drawed.push(...userMoves);
            room.users.delete(socketId);
            socket.leave(roomId);
        };
        socket.on("create_room", (username) => {
            console.log(`🏠 Creating room for user: ${username}`);
            let roomId;
            do {
                roomId = Math.random().toString(36).substring(2, 6);
            } while (rooms.has(roomId));
            socket.join(roomId);
            rooms.set(roomId, {
                usersMoves: new Map([[socket.id, []]]),
                drawed: [],
                users: new Map([[socket.id, username]]),
            });
            console.log(`✅ Room created: ${roomId}`);
            io.to(socket.id).emit("created", roomId);
        });
        socket.on("check_room", (roomId) => {
            if (rooms.has(roomId))
                socket.emit("room_exists", true);
            else
                socket.emit("room_exists", false);
        });
        socket.on("join_room", (roomId, username) => {
            const room = rooms.get(roomId);
            if (room && room.users.size < 12) {
                socket.join(roomId);
                room.users.set(socket.id, username);
                room.usersMoves.set(socket.id, []);
                io.to(socket.id).emit("joined", roomId);
            }
            else
                io.to(socket.id).emit("joined", "", true);
        });
        socket.on("joined_room", () => {
            const roomId = getRoomId();
            const room = rooms.get(roomId);
            if (!room)
                return;
            io.to(socket.id).emit("room", room, JSON.stringify([...room.usersMoves]), JSON.stringify([...room.users]));
            socket.broadcast
                .to(roomId)
                .emit("new_user", socket.id, room.users.get(socket.id) || "Anonymous");
        });
        socket.on("leave_room", () => {
            const roomId = getRoomId();
            leaveRoom(roomId, socket.id);
            io.to(roomId).emit("user_disconnected", socket.id);
        });
        socket.on("draw", (move) => {
            const roomId = getRoomId();
            const timestamp = Date.now();
            move.id = (0, uuid_1.v4)();
            addMove(roomId, socket.id, { ...move, timestamp });
            io.to(socket.id).emit("your_move", { ...move, timestamp });
            socket.broadcast
                .to(roomId)
                .emit("user_draw", { ...move, timestamp }, socket.id);
        });
        socket.on("undo", () => {
            const roomId = getRoomId();
            undoMove(roomId, socket.id);
            socket.broadcast.to(roomId).emit("user_undo", socket.id);
        });
        socket.on("mouse_move", (x, y) => {
            socket.broadcast.to(getRoomId()).emit("mouse_moved", x, y, socket.id);
        });
        socket.on("send_msg", (msg) => {
            io.to(getRoomId()).emit("new_msg", socket.id, msg);
        });
        socket.on("disconnecting", () => {
            const roomId = getRoomId();
            leaveRoom(roomId, socket.id);
            io.to(roomId).emit("user_disconnected", socket.id);
        });
        socket.on("disconnect", () => {
            console.log(`🔌 Socket disconnected: ${socket.id}`);
        });
    });
    app.all("*", (req, res) => nextHandler(req, res));
    server.listen(port, '0.0.0.0', () => {
        console.log(`🚀 Whizle server ready on http://0.0.0.0:${port}`);
        console.log(`📊 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`🌐 Railway URL: https://real-time-whiteboard-websockets-production.up.railway.app/`);
    });
    const gracefulShutdown = (signal) => {
        console.log(`\n🛑 Received ${signal}. Shutting down gracefully...`);
        server.close(() => {
            console.log("✅ HTTP server closed");
            process.exit(0);
        });
        setTimeout(() => {
            console.error("❌ Could not close connections in time, forcefully shutting down");
            process.exit(1);
        }, 10000);
    };
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("uncaughtException", (err) => {
        console.error("❌ Uncaught Exception:", err);
        process.exit(1);
    });
    process.on("unhandledRejection", (reason, promise) => {
        console.error("❌ Unhandled Rejection at:", promise, "reason:", reason);
        process.exit(1);
    });
}).catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
});
