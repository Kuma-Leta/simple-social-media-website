import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import AppError from "../globalErrorHandling/appError";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
};

export const loginUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  const userAccount = await userModel.findOne({ email });
  if (!userAccount) {
    return next(new AppError("No user found", 404));
  }

  const isMatch = await bcrypt.compare(password, userAccount.password);

  if (isMatch) {
    res.status(200).json({
      id: userAccount._id,
      email: userAccount.email,
      name: userAccount.name,
      token: generateToken(userAccount.id),
    });
  } else {
    return next(new AppError("Incorrect password", 400));
  }
};
