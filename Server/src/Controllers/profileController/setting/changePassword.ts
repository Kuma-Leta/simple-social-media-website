import { model } from "mongoose";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../../models/models";
import { AuthenticatedRequest } from "../../../middleware/authenticationMiddleware";

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { oldPassword, newPassword } = req.body;

    // Find the user by ID
    const user = await UserModel.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the old password matches
    const isMatch = await user.comparePassword(oldPassword);

    if (!isMatch) {
      return res.status(400).json({ error: "Old password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error changing password" });
  }
};
