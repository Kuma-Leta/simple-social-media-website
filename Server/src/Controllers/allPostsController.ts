import { NextFunction, Request, Response } from "express";
import { postModel } from "../models/postModel";
import AppError from "../globalErrorHandling/appError";
export const getAllPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const posts = await postModel.find().populate("comments");
  if (posts.length === 0) {
    return next(new AppError("no posts found", 404));
  }

  res.status(200).json({ message: "success", posts });
};
