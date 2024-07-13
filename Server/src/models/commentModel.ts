import mongoose, { Schema } from "mongoose";

interface Comment {
  comment: string;
  postId: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}
const CommentSchema = new Schema({
  comment: {
    type: String,
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
export const commentModel = mongoose.model("comments", CommentSchema);
