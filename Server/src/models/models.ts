import mongoose, { Document, Schema, model } from "mongoose";

// Define the Post interface and schema inline within the User model
interface Post {
  author: string;
  textContent: string;
  rating?: number;
  imageContent?: string;
  videoContent?: string;
  category: string;
}

interface User extends Document {
  name: string;
  password: string;
  email: string;
  posts: Post[];
}

const postSchema = new Schema<Post>(
  {
    author: { type: String, required: true },
    textContent: { type: String, required: true },
    category: { type: String, required: true },
    rating: { type: Number, default: 4, min: 1, max: 5 },
    imageContent: { type: String, default: "" },
    videoContent: { type: String, default: "" },
  }
  // { _id: false } // Prevents creating an _id field for each subdocument
);

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: [true, "You must provide a name"],
      trim: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "You must provide a password"],
    },
    email: {
      type: String,
      required: [true, "You must provide an email"],
      unique: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Email format is invalid"],
    },
    posts: {
      type: [postSchema],
      default: [], // Default to an empty array if no posts are provided
    },
  },
  { timestamps: true }
);

export const UserModel = model<User>("User", userSchema);

export { Post }; // Export the Post interface if needed elsewhere
