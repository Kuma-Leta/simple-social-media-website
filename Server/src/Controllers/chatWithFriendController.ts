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
    const { senderId, receiverId, message } = data;
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
  const { user1Id, user2Id } = req.params;
  const result = await chatModel
    .find({
      $or: [
        {
          senderId: user1Id,
          receiverId: user2Id,
        },
        { senderId: user2Id, receiverId: user1Id },
      ],
    })
    .sort({ timestamp: 1 });
  res.status(200).json(result);
};
