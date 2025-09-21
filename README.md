# Whizle - Real-Time Collaborative Whiteboard

## 🎨 Whiz Through Ideas. Together.

**Created by Prathamesh Bhamare & Zulfikar Parihar**

Whizle is a state-of-the-art digital whiteboard application that enables seamless real-time collaboration, allowing teams to share ideas, brainstorm, and create together from anywhere in the world.

## Features
- Real-time collaboration
- Drawing tools (pen, highlighter, shapes)
- Text tools (text boxes, fonts)
- Image upload and manipulation
- User authentication and roles
- Saving and loading whiteboard sessions
- Exporting whiteboards as images or PDFs
- Integration with other collaboration tools (e.g., Slack, Microsoft Teams)

## 🚀 Technologies
- **Frontend**: React 18, Next.js 13, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, Socket.IO for WebSockets
- **State Management**: Recoil
- **Animation**: Framer Motion
- **Development**: TypeScript, ESLint, Prettier
- **Deployment**: Railway (Production Ready)


## Setup Instructions

1. **Clone the repository:**
    ```bash
    https://github.com/kashish281/Whiteboard.git
    cd whiteboard
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Run the development server:**
    ```bash
    npm run dev
    ```

4. **Build the project:**
    ```bash
    npm run build
    ```

5. **Start the production server:**
    ```bash
    npm start
    ```

## 🚢 Railway Deployment Instructions

### Prerequisites
- Railway account ([railway.app](https://railway.app))
- GitHub repository with your code

### Deployment Steps

1. **Connect to Railway:**
   - Go to [railway.app](https://railway.app) and sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your Whizle repository

2. **Configure Environment Variables:**
   - In Railway dashboard, go to your project
   - Click "Variables" tab
   - Add: `NODE_ENV=production`

3. **Deploy:**
   - Railway will automatically detect the Node.js project
   - It will run `npm run build` followed by `npm start`
   - Your app will be live at your Railway URL

### Health Check
- Railway will monitor your app using the `/health` endpoint
- The app includes graceful shutdown handling for production stability

### Custom Domain (Optional)
- In Railway dashboard, go to "Settings" → "Domains"
- Add your custom domain and configure DNS

### 📋 Pre-Deployment Checklist
- ✅ Updated package.json with correct name and dependencies
- ✅ Configured Railway-specific files (railway.toml, Procfile)
- ✅ Enhanced health check endpoint for monitoring
- ✅ Optimized Socket.IO for production
- ✅ Added graceful shutdown handling
- ✅ Updated branding to "Whizle"
- ✅ Added proper error handling
- ✅ Configured Next.js for production optimization

### 🎯 Features Ready for Production
- ✅ Real-time collaborative drawing
- ✅ WebSocket connections with auto-reconnection
- ✅ Room management (create/join)
- ✅ User management and presence
- ✅ Chat functionality
- ✅ Responsive design
- ✅ Production-grade error handling

## Scripts

- `dev`: Runs the development server with `nodemon` for hot-reloading.
- `dev:client`: Runs the client-side code with `ts-node`.
- `build:server`: Compiles the server-side TypeScript code.
- `build:next`: Builds the Next.js application.
- `build`: Runs all build-related scripts.
- `start`: Sets the `NODE_ENV` to production and starts the server.
- `lint`: Runs the Next.js linter.
- `predeploy`: Runs the build script before deploying.
- `deploy`: Deploys the project to GitHub Pages.



---


