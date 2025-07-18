import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

// Create express app and http server
const app = express();
const server = http.createServer(app);

// initialize socket.io server
export const io = new Server(server, {
    cors: {
    origin: "https://chat-app-eta-mocha.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
})

//store online users
export const userSocketMap = {} // {userId: socketId}
//Socket.io connection handler
io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    console.log("User connected", userId);
    
    if(userId) {
        userSocketMap[userId] = socket.id;
    }

    // emit online users to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socket.on("disconnect", () => {
        console.log("User disconnected", userId);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    })
})

// middleware setup
const allowedOrigins = ["https://chat-app-eta-mocha.vercel.app"];
app.use(express.json({limit: "4mb"}));
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

//routes setup
app.use("/api/status", (req, res) => {
    res.send("server is live")
})

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

// connect to MongoDB
await connectDB();

if(process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5001;
    server.listen(PORT, () => {
        console.log(`server is running on port : ${PORT}`);
    })
}

// export server for vercel
export default server;