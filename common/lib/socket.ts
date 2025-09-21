import { io, Socket } from "socket.io-client";

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  transports: ["websocket", "polling"],
  timeout: 20000,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  autoConnect: true,
  forceNew: false
});
