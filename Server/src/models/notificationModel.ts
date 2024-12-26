import mongoose, { model, Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    notificationReceiverId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    reactorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
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
      type: Boolean,
      default: false,
    },
    metaData: {
      type: Object,
      default: {},
    },
    deletedAt: {
      type: Date,
      default: null, // For soft deletion
    },
  },
  { timestamps: true }
);

// Add indexes for performance
notificationSchema.index({ notificationReceiverId: 1, isRead: 1 });
notificationSchema.index({ deletedAt: 1 });

const notificationModel = model("notification", notificationSchema);

export default notificationModel;
