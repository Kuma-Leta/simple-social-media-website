import { Request } from "express";
import mongoose, { Schema, model } from "mongoose";
interface Rating {
  rating: number;
  postId: mongoose.Schema.Types.ObjectId;
  user: mongoose.Schema.Types.ObjectId;
}
const ratingSchema = new Schema<Rating>(
  {
    rating: {
      type: Number,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "posts",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);
export const ratingModel = model("rating", ratingSchema);
