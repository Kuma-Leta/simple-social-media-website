import express from "express";
import routes from "./routes/routes";
import { Router } from "express";
import { connectDB } from "./connectDb";
import cors from "cors";
import bodyParser from "body-parser";
import globalErrorHandler from "./globalErrorHandling/globalErrorHandler";
import AppError from "./globalErrorHandling/appError";
// const router = express.Router();
const app = express();
app.use("/uploads", express.static("uploads"));
connectDB();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/api", routes);
app.all("*", (req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server!`, 404));
});
app.use(globalErrorHandler);
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`the server is listening for port :${port}`);
});
