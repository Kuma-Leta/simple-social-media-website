import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { postModel } from "../../models/postModel";
import AppError from "../../globalErrorHandling/appError";
export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.id;
  const Post = await postModel.findById(postId);
  if (!Post) {
    return new AppError("no post found", 404);
  }
  const result = await postModel.findByIdAndDelete(postId);
  next();
};
