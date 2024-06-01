import { Schema, Model, model } from "mongoose";
interface Rating {
  user: string;
  rating: number;
}
const ratingSchema = new Schema<Rating>(
  {
    user: {
      type: String,
      required: true,
    },
    rating: {
      default: 4,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const ratingModel = model("rating", ratingSchema);
