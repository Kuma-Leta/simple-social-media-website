import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { UserModel } from "../../models/models";
import { postModel } from "../../models/postModel";
import AppError from "../../globalErrorHandling/appError";
export const getPreviousPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const previousPosts = await postModel.find({ user: req.user });
  if (!previousPosts) {
    return next(new AppError("no post found by this user", 404));
  }
  res.status(200).json({
    status: "success",
    result: previousPosts,
  });
};
