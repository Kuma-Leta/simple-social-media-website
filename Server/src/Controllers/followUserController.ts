import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import followModel from "../models/followModel";

const followUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { id: targetUser } = req.params;
  const currentUserId = req.user.id;
  if (currentUserId === targetUser) {
    return res.status(400).json({ message: "you cannot follow your self" });
  }
  try {
    const followExists = await followModel.findOne({
      followers: req.user.id,
      following: targetUser,
    });
    if (followExists) {
      const unfollowResult = await followExists.deleteOne({
        followers: targetUser,
      });
      return res.status(200).json({ message: "successfully deleted" });
    }
    const followRequestResult = await followModel.create({
      followers: req.user._id,
      following: targetUser,
      followedAt: Date.now(),
    });
    if (!followRequestResult) {
      return res.status(500).json({ message: "errror while following" });
    }
    res
      .status(201)
      .json({ followRequestResult, message: `you started following ` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "internal server error " });
  }
};

export default followUser;
