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
  let previousLike = Number(post?.likes) || 0;
  const like = await likeModel.findOne({ postId, user: req.user });
  if (like) {
    previousLike -= 1;
    await likeModel.findOneAndDelete({ postId, user: req.user });
  } else {
    previousLike += 1;
    await likeModel.create({
      postId,
      user: req.user,
    });
  }
  const updatedLike = previousLike;
  const updatedPost = await postModel.findByIdAndUpdate(
    postId,
    {
      likes: updatedLike,
    },
    { new: true }
  );
  const io = getSocket();
  io.emit("newLike", {
    postId,
    message: "some one liked your post",
    user: req.user,
  });

  res.status(200).json({ status: "success", updatedPost });
};
export default addLikeForPost;
