import { Request, Response } from "express";
import { UserModel } from "../../../models/models";
import { AuthenticatedRequest } from "../../../middleware/authenticationMiddleware";

export const changeEmail = async (req: AuthenticatedRequest, res: Response) => {
  const { newEmail } = req.body;
  const userId = req.user._id;
  const existingUser = await UserModel.findOne({ email: newEmail });
  if (existingUser) {
    return res.status(400).json({ message: "Email already in use" });
  }
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { email: newEmail },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res
    .status(200)
    .json({ message: "Email changed successfully", email: user.email });
};
export const changeName = async (req: AuthenticatedRequest, res: Response) => {
  const { newName } = req.body;
  const userId = req.user._id;
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { name: newName },
    { new: true }
  );
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  res
    .status(200)
    .json({ message: "Name changed successfully", name: user.name });
};

export const deleteUserAccount = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user._id;
  await UserModel.findByIdAndDelete(userId);
  res.status(200).json({ message: "Account deleted successfully" });
};
