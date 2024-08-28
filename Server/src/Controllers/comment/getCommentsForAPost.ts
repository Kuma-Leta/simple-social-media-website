import { NextFunction, Request, Response } from "express";
import { postModel } from "../../models/postModel";

const getCommentsForAPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const postId = req.params.postId;
  const post = await postModel.findById(postId).populate("comments");
  if (!post) {
    return res.status(200).json({
      status: "fail",
      message: "no post found with this id",
    });
  }
  const comments = post.comments;
  res.status(200).json({ status: "success", comments });
};
export default getCommentsForAPost;
