import { Request } from "express";
import mongoose, { Schema, model } from "mongoose";
interface Rating {
  rating: number;
  postId: mongoose.Schema.Types.ObjectId;
  name: string;
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
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
export const ratingModel = model("rating", ratingSchema);
