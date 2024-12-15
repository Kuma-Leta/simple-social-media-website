import mongoose, { model, Types, Schema } from "mongoose";
interface Follow {
  user: Types.ObjectId;
  followings: Types.ObjectId[];
  followers: Types.ObjectId[];
}
const followSchema = new Schema<Follow>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
      unique: true,
    },
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user",
      },
    ],
  },
  {
    timestamps: true,
  }
);
// followSchema.path("followers").validate(function (value: Types.ObjectId[]) {
//   return value.length > 0; // Followers array must have at least one element
// }, "Followers array must have at least one follower.");
const followModel = model("Follow", followSchema);
export default followModel;
