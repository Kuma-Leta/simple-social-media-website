import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userModel } from "../models/userModel";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
};

export const createUsers = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    const userAlreadyExists = await userModel.findOne({ email });
    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists" });
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
  } catch (error: any) {
    let statusCode = 500;
    let message = "Internal server error";

    if (error.code === 11000) {
      message = "Email already exists";
      statusCode = 400;
    } else if (error.name === "ValidationError") {
      statusCode = 400;
      message = "Validation error";
    }

    res.status(statusCode).json({
      message,
      status: statusCode,
    });
  }
};
