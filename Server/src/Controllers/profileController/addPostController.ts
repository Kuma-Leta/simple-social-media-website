import { NextFunction, Request, Response } from "express";
import { userModel } from "../../models/userModel";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { postModel } from "../../models/postModel";
import AppError from "../../globalErrorHandling/appError";

interface MulterRequest extends AuthenticatedRequest {
  files: {
    imageContent?: Express.Multer.File[];
    videoContent?: Express.Multer.File[];
  };
}
export const addPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const multerReq = req as MulterRequest;
  if (!multerReq.user || !multerReq.user._id) {
    return new AppError("Unauthorized request", 401);
  }

  console.log(multerReq.user._id);
  console.log(req.body);

  const { author, textContent, category } = req.body;
  const userId = multerReq.user._id;
  const user = await userModel.findById(userId);

  if (!user) {
    return new AppError("User not found", 404);
  }
  if (!author || !textContent || !category) {
    return new AppError("All fields are required", 400);
  }
  const newPost = {
    author,
    textContent,
    category,
    imageContent: multerReq.files?.imageContent
      ? multerReq.files.imageContent[0].path
      : "",
    videoContent: multerReq.files?.videoContent
      ? multerReq.files.videoContent[0].path
      : "",
    user: userId,
  };

  // user.posts.push(newPost);
  const Post = await postModel.create(newPost);
  // const updatedUser = await user.save();

  res.status(201).json(Post);
  next();
};
