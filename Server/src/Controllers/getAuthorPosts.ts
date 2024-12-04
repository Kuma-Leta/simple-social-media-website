import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { Response, NextFunction } from "express";
import { postModel } from "../models/postModel";
const getAuthorPosts = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { postOwner } = req.params;
  const authorPosts = await postModel.find({ user: postOwner });
  res.status(200).json({ message: "success", authorPosts });
};
export default getAuthorPosts;
