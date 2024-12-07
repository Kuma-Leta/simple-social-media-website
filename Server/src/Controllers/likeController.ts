import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import { postModel } from "../models/postModel";
import { likeModel } from "../models/likeModel";
import { getSocket } from "..";
const addLikeForPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { postId } = req.body;
  const post = await postModel.findById(postId);
  const like = await likeModel.findOne({ postId, user: req.user });
  if (like) {
    await likeModel.findOneAndDelete({ postId, user: req.user });
    await postModel.findByIdAndUpdate(postId, { $inc: { likes: -1 } });
  } else {
    await likeModel.create({ postId, user: req.user });
    await postModel.findByIdAndUpdate(postId, { $inc: { likes: 1 } });
  }
  console.log(post);

  res.status(200).json({ status: "success", post });
};
export default addLikeForPost;
