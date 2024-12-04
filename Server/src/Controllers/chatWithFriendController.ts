import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import chatModel from "../models/chatModel";
interface Data {
  receiverId: string;
  senderId: String;
  message: string;
}
export const saveMessage = async (data: Data) => {
  try {
    const result = new chatModel(data);
    await result.save();
    return result;
  } catch (error) {
    console.error("error saving new message");
    throw error;
  }
};
export const getChatHistory = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { roomId } = req.params;
  const result = await chatModel.find({ roomId }).sort({ timestamp: 1 });
  res.status(200).json(result);
};
