import { Request, Response } from "express";
import { userModel } from "../../models/userModel";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { postModel } from "../../models/postModel";

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
    const userId = multerReq.user._id;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!author || !textContent || !category) {
      return res.status(400).json({ error: "All fields are required" });
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
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      error: "Error creating post",
      details: error.message,
    });
  }
};
