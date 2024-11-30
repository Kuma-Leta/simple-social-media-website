import express, { NextFunction, Request, Response } from "express";
import path from "path";
import http from "http";
import routes from "./routes/routes";
import { Router } from "express";
import { connectDB } from "./connectDb";
import cors from "cors";
import bodyParser from "body-parser";
import globalErrorHandler from "./globalErrorHandling/globalErrorHandler";
import AppError from "./globalErrorHandling/appError";
// const router = express.Router();
import { Server } from "socket.io";
import { saveMessage } from "./Controllers/chatWithFriendController";
const app = express();
const server = http.createServer(app);

connectDB();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);

app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});
let onlineUsers = new Map();
io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("userOnline", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("sendMessage", async (data) => {
    try {
      const { senderId, receiverId, message } = data;

      const result = await saveMessage({ senderId, receiverId, message });
      const receiverSocketId = onlineUsers.get(receiverId);
      if (receiverSocketId) {
        socket.to(receiverSocketId).emit("receiveMessage", result);
      }
    } catch (error) {}
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    onlineUsers.forEach((value, key) => {
      if (value === socket.id) {
        onlineUsers.delete(key);
      }
    });
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`the server is listening for port :${port}`);
});
export const getSocket = () => io;
