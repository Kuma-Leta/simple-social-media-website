import { Request, Response } from "express";
import { UserModel } from "../../models/models";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";

interface MulterRequest extends AuthenticatedRequest {
  files: {
    imageContent?: Express.Multer.File[];
    videoContent?: Express.Multer.File[];
  };
}
export const addPost = async (req: Request, res: Response) => {
  try {
    const multerReq = req as MulterRequest;
    if (!multerReq.user || !multerReq.user._id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    console.log(multerReq.user._id);
    console.log(req.body);

    const { author, textContent, category } = req.body;

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
    };

    const userId = multerReq.user._id;
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.posts.push(newPost);
    const updatedUser = await user.save();

    res.status(201).json(updatedUser);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: "Error creating post",
      details: error.message,
    });
  }
};
