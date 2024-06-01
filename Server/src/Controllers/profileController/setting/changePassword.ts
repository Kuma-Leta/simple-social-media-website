import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../../models/models";
import { AuthenticatedRequest } from "../../../middleware/authenticationMiddleware";

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { oldPassword, newPassword } = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return res.status(400).json({ error: "Old password is incorrect" });
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password changed successfully" });
};
