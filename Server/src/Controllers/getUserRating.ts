import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { NextFunction, Response } from "express";
import { ratingModel } from "../models/ratingModel";
export const getUserRating = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId, raterId } = req.params;
  console.log(req.params);
  const rating = await ratingModel.findOne({ postId, raterId });

  if (!rating) {
    return res.status(200).json({ rating: null });
  }

  res.status(200).json({ rating: rating.amount });
};
