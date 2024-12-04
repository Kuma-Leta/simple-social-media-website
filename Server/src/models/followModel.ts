import mongoose, { model, Schema } from "mongoose";
interface Follow {
  following: mongoose.Schema.Types.ObjectId;
  followers: mongoose.Types.ObjectId;
  followedAt: Date;
}
const followSchema = new Schema<Follow>(
  {
    following: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followers: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    followedAt: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
  }
);
const followModel = model("Follow", followSchema);
export default followModel;
