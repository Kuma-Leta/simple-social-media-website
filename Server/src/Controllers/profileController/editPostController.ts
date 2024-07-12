import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { NextFunction, Response } from "express";
import AppError from "../../globalErrorHandling/appError";
import { postModel } from "../../models/postModel";
interface MulterRequest extends AuthenticatedRequest {
  files: {
    imageContent: Express.Multer.File[];
    videoContent: Express.Multer.File[];
  };
}
export const updatePost = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  const multerReq = req as MulterRequest;
  const { id } = req.params;
  const { author, category, textContent } = req.body;
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return next(new AppError("no post found for this id", 404));
    }
    // if (
    //   !multerReq.user ||
    //   multerReq.user._id ||
    //   multerReq.user._id !== post.user.toString()
    // ) {
    //   return next(new AppError("unauthorized request", 401));
    // }
    post.author = author || post.author;
    post.textContent = textContent || post.textContent;
    post.category = category || post.category;
    if (multerReq.files?.imageContent) {
      post.imageContent = multerReq.files.videoContent[0].path.replace(
        /\\/g,
        "/"
      );
    }
    if (multerReq.files?.videoContent) {
      post.videoContent = multerReq.files.videoContent[0].path.replace(
        /\\/g,
        "/"
      );
    }
    const updatedPost = await post.save();
    res.status(200).json({ status: "success", updatedPost });
  } catch (error) {
    next(new AppError("failed to update post", 500));
  }
};
