import mongoose, { Schema } from "mongoose";

export interface Comment {
  comment: string;
  postId: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
  commentor: string;
  date: Date;
}
export const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
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
  commentor: { type: String, required: true },
});
export const commentModel = mongoose.model("comments", CommentSchema);
