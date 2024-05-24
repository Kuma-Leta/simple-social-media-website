import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/models";

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "", { expiresIn: "30d" });
};

export const loginUsers = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const userAccount = await UserModel.findOne({ email });
    if (!userAccount) {
      return res
        .status(400)
        .json({ message: "Invalid user credentials no user with this email" });
    }
    const isMatch = await bcrypt.compare(password, userAccount.password);
    console.log(userAccount.password);
    if (isMatch) {
      res.status(200).json({
        id: userAccount._id,
        email: userAccount.email,
        name: userAccount.name,
        token: generateToken(userAccount.id),
      });
    } else {
      res.status(400).json({ message: "Invalid user credentials" });
    }
  } catch (error: any) {
    res.status(500).json({
      status: "error",
      message: "Internal server error",
      error: error.message,
    });
  }
};
