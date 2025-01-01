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
import { saveMessage } from "./Controllers/chatWithFriendController";
import { initializeSocket } from "./sockets/socketConfig";
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
initializeSocket(server);

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`the server is listening for port :${port}`);
});
// export const getSocket = () => io;
