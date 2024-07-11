import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { Response, NextFunction } from "express";
import { postModel } from "../../models/postModel";
import AppError from "../../globalErrorHandling/appError";
const getSpecificPost = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const post = await postModel.findById(id);
  if (!post) {
    return next(new AppError("no post found for id", 404));
  }
  res.status(200).json({
    status: "success",
    post,
  });
};
export default getSpecificPost;
