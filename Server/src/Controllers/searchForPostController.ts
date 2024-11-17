import { NextFunction, Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { postModel } from "../models/postModel";
import AppError from "../globalErrorHandling/appError";
import catchAsync from "../globalErrorHandling/catchAsync";
export const searchForPostByCategory = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const category = req.params.category;
    if (!category) {
      return next(new AppError("no category found", 404));
    }
    const posts = await postModel.find({ category });
    if (posts.length === 0) {
      return next(
        new AppError("there is no post for categories you are looking for", 404)
      );
    }
    res.status(200).json({ message: "success", posts });
  }
);
export const searchForPostByUserQuery = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { userQuery } = req.body;
  // console.log(userQuery);
  if (!userQuery) {
    next(new AppError("no user query found", 400));
  }
  const regex = new RegExp(userQuery, "i");
  const searchConditions = {
    $or: [{ author: regex }, { textContent: regex }, { category: regex }],
  };
  const posts = await postModel.find(searchConditions).populate("comments");
  if (!posts) {
    return new AppError("no post found", 404);
  }
  return res.status(200).json({ message: "success", posts });
};
