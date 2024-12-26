import { AuthenticatedRequest } from "../middleware/authenticationMiddleware";
import notificationModel from "../models/notificationModel";
import { Response } from "express";
const getNotificationHistory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { receiverId } = req.params;
  try {
    const notifications = await notificationModel
      .find({ notificationReceiverId: receiverId })
      .sort({ createdAt: -1 });
    if (notifications) {
      return res.status(200).json({ message: "success", notifications });
    }
  } catch (error) {
    return res.status(500).json({ message: "failed" });
  }
};
export default getNotificationHistory;
