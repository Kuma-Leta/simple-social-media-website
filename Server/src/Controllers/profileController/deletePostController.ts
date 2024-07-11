import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { postModel } from "../../models/postModel";
import AppError from "../../globalErrorHandling/appError";
export const deletePost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;
  const Post = await postModel.findById(postId);
  if (!Post) {
    return next(new AppError("no post found", 404));
  }
  const result = await postModel.findByIdAndDelete(postId);
  res.status(200).json({ message: "deleted successfully" });
  console.log(" post deleted");
};
