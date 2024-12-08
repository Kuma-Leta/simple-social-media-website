import { NextFunction, Request, Response } from "express";
import { ratingModel } from "../models/ratingModel";
import AppError from "../globalErrorHandling/appError";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { userModel } from "../models/userModel";
import { postModel } from "../models/postModel";
import { trusted } from "mongoose";
export const addRating = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId, raterId, amount } = req.body;
  const postRater = await userModel.findOne(req.user._id);
  if (!postRater) {
    return next(new AppError("no user Found", 400));
  }
  const post = await postModel.findOne({ _id: postId });
  if (!post) {
    return next(new AppError("no post found", 400));
  }
  if (post.user === req.user.id) {
    return next(new AppError("you can't rate your self", 400));
  }
  const allReadyRated = await ratingModel.findOne({ postId, raterId });
  console.log(allReadyRated);
  if (allReadyRated) {
    await ratingModel.findByIdAndUpdate(
      allReadyRated._id,
      { amount: amount },
      { new: true }
    );
  } else {
    const result = await ratingModel.create(req.body);
  }
  const allRatingForThePost = await ratingModel.find({ postId });
  if (!allRatingForThePost || allRatingForThePost.length === 0) {
    return;
  }
  let totalRating = allRatingForThePost.reduce((acc, rating) => {
    return acc + rating.amount;
  }, 0);
  const updatedRating = Number(
    (totalRating / allRatingForThePost.length).toFixed(1)
  );
  await postModel.findByIdAndUpdate(
    postId,
    { rating: updatedRating },
    { new: true }
  );
  res.status(200).json({ status: "success", updatedRating });
};
