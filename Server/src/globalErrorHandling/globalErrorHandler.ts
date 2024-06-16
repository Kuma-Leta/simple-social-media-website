import { NextFunction, Request, Response } from "express";
import AppError from "./appError";

const globalErrorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "internal server error";
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
export default globalErrorHandler;
