import { Request } from "express";
import mongoose, { Schema, model } from "mongoose";
interface Rating {
  postOwner: mongoose.Schema.Types.ObjectId;
  postId: mongoose.Schema.Types.ObjectId;
  raterId: mongoose.Schema.Types.ObjectId;
  rater: String;
  amount: number;
}
const ratingSchema = new Schema<Rating>(
  {
    amount: {
      type: Number,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    raterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    rater: {
      type: String,
      required: true,
    },
    postOwner: {
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
