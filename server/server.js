import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";

//creatign http server and express app
const app = express();
const server = http.createServer(app);

//initializing socket.io servers
export const io = new Server(server, { cors: { origin: "*" } });

// to store online users
export const userSocketMap = {};

//socket.io connection handler
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("user connected", userId);
  if (userId) {
    userSocketMap[userId] = socket.id;
  }
  //emit online users for all connected clients
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  //disconnecting
  socket.on("disconnect", () => {
    console.log("user disconnected", userId);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

//middleware
app.use(cors());
app.use(express.json({ limit: "4mb" }));

app.use("/api/status", (req, res) => res.send("server is live"));

// adding routes
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

//connection to Mongo DB
await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`server is running on port :${PORT}`));
}

//exporting server for vercel
export default server;
