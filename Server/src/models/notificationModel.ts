import mongoose, { model, Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    notificationReceiver: {
      type: String,
      required: true,
    },
    notificationReceiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },

    reactor: {
      required: true,
      type: String,
    },
    reactorId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    notificationType: {
      required: true,
      type: String,
      enum: ["message", "like", "comment", "follow", "rating"],
    },
    message: {
      required: true,
      type: String,
    },
    isRead: {
      required: true,
      type: Boolean,
      default: false,
    },
    metaData: {
      type: Object,
    },
  },
  { timestamps: true }
);
const notificationModel = model("notification", notificationSchema);
export default notificationModel;
