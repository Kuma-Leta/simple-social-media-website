import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
  comparePassword(candidatePassword: string): Promise<boolean>;
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Add method to compare passwords
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const UserModel = model<User>("User", userSchema);

export { Post };
