import { NextFunction, Request, Response } from "express";
import { ratingModel } from "../models/ratingModel";
import AppError from "../globalErrorHandling/appError";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { userModel } from "../models/userModel";
import { postModel } from "../models/postModel";
export const addRating = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId, rating, user } = req.body;
  const userRating = await userModel.findById(req.user.id);
  if (!userRating) {
    return next(new AppError("no user found", 404));
  }
  const name = userRating?.firstName;
  //implement so that user cannot rate it self
  const post = await postModel.findById(postId);
  if (!post) {
    return next(new AppError("Post not found", 404));
  }

  if (post.user.toString() === req.user.id) {
    return next(new AppError("You can't rate your own post", 400));
  }
  const allreadyRated = await ratingModel.findOne({
    name: name,
    postId: postId,
  });
  if (allreadyRated) {
    return next(new AppError("you can't rate twice", 400));
  }

  const result = await ratingModel.create({
    postId: postId,
    rating: rating,
    name: name,
    user,
  });
  if (!result) {
    next(new AppError("failed to create rating", 400));
  }
  const ratingsForPost = await ratingModel.find({ postId });
  const totalRatings = ratingsForPost.reduce((acc, cur) => acc + cur.rating, 0);
  const averagedRatingForPost = totalRatings / ratingsForPost.length;
  const updatePostRating = await postModel.findByIdAndUpdate(
    postId,
    {
      rating: averagedRatingForPost,
    },
    { new: true }
  );
  res.status(200).json({
    message: "success",
    name,
    result,
    averagedRatingForPost,
    updatePostRating,
  });
};
