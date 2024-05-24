import { Request, Response } from "express";
import { AuthenticatedRequest } from "../../middleware/authenticationMiddleware";
import { UserModel } from "../../models/models";
export const getPreviousPost = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Assuming posts are fetched for the authenticated user
    const user = await UserModel.findById(req.user._id).select("posts");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ result: user.posts });
  } catch (error: any) {
    res
      .status(500)
      .json({ error: "Error fetching posts", details: error.message });
  }
};
