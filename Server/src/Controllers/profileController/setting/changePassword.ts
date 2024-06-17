import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import { UserModel } from "../../../models/models";
import { AuthenticatedRequest } from "../../../middleware/authenticationMiddleware";
import AppError from "../../../globalErrorHandling/appError";

export const changePassword = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { oldPassword, newPassword } = req.body;
  const user = await UserModel.findById(req.user._id);
  if (!user) {
    return new AppError("User not found", 404);
  }
  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) {
    return new AppError("Old password is incorrect", 400);
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({ message: "Password changed successfully" });
  next();
};
