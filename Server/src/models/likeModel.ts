import mongoose, { Schema } from "mongoose";

interface Like {
  value: number;
  postId: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}
const likeSchema = new Schema({
  value: {
    type: Number,
    required: true,
  },
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "post",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});
export const likeModel = mongoose.model("like", likeSchema);
