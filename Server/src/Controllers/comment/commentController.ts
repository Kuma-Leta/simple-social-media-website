import { Comment, commentModel } from "../../models/commentModel";
import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { postModel } from "../../models/postModel";
const addCommentForPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { comment, postId } = req.body;
  const newComment = {
    comment: comment,
    postId: postId,
    user: req.user._id,
    date: new Date(),
  };
  const post = await postModel.findById(postId);
  const savedComment = await commentModel.create(newComment);
  await post?.comments?.push(savedComment.id);
  await post?.save();
  const populatedPost = await postModel
    .findById(postId)
    .populate("comments")
    .exec();
  res.status(200).json({ status: "success", populatedPost, savedComment });
};
export default addCommentForPost;
