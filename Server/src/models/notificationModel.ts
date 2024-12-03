import mongoose, { Schema } from "mongoose";

interface Notification {
  user: mongoose.Schema.Types.ObjectId;
  type: string;
  message: string;
  data: string;
  title: string;
  isRead: boolean;
  createdAt: Date;
}
const notificationModel = new Schema(
  {
    user: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
    },
    type: {
      required: true,
      type: String,
      enum: ["message", "like", "comment", "system", "rating"],
    },
    message: {
      required: true,
      type: String,
    },
    isRead: {
      required: true,
      default: false,
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
    title: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);
export default notificationModel;
