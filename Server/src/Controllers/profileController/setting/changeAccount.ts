import { NextFunction, Request, Response } from "express";
import { UserModel } from "../../../models/models";
import { AuthenticatedRequest } from "../../../middleware/authenticationMiddleware";
import AppError from "../../../globalErrorHandling/appError";

export const changeEmail = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { newEmail } = req.body;
  const userId = req.user._id;
  const existingUser = await UserModel.findOne({ email: newEmail });
  if (existingUser) {
    new AppError("Email already in use", 400);
  }
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { email: newEmail },
    { new: true }
  );
  if (!user) {
    return new AppError("User not found", 404);
  }
  res
    .status(200)
    .json({ message: "Email changed successfully", email: user.email });
  next();
};
export const changeName = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { newName } = req.body;
  const userId = req.user._id;
  const user = await UserModel.findByIdAndUpdate(
    userId,
    { name: newName },
    { new: true }
  );
  if (!user) {
    return new AppError("User not found", 404);
  }
  res
    .status(200)
    .json({ message: "Name changed successfully", name: user.name });
  next();
};

export const deleteUserAccount = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user._id;
  await UserModel.findByIdAndDelete(userId);
  res.status(200).json({ message: "Account deleted successfully" });
  next();
};
