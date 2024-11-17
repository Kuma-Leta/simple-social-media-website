import mongoose, { Schema, model } from "mongoose";
import { CommentSchema } from "./commentModel";

export interface Post extends Document {
  user: mongoose.Schema.Types.ObjectId;
  textContent: string;
  videoContent?: string;
  imageContent?: string;
  author: string;
  category: string;
  rating?: number;
  likes?: number;
  comments?: Comment[];
}
const postSchema = new Schema<Post>({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  textContent: {
    type: String,
    required: true,
  },
  imageContent: {
    type: String,
    default: "",
  },
  rating: {
    type: Number,
    default: 4,
  },
  category: {
    type: String,
    required: true,
  },
  videoContent: {
    type: String,
  },
  author: {
    type: String,
    required: true,
  },
  likes: Number,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});
export const postModel = model("post", postSchema);
