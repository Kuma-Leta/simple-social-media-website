import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";
import AppError from "../globalErrorHandling/appError";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
};

export const createUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, email, password } = req.body;
  const userAlreadyExists = await userModel.findOne({ email });
  if (userAlreadyExists) {
    new AppError("User already exists", 400);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userAccount = new userModel({
    email,
    password: hashedPassword,
    name,
  });
  await userAccount.save();
  res.status(201).json({
    id: userAccount._id,
    name: userAccount.name,
    email: userAccount.email,
    token: generateToken(userAccount.id),
  });
  next();
};
