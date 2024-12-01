import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin" | "rider";
  resetPasswordToken: string;
  resetPasswordTokenExpiration: Date;
  verificationToken: string;
  verificationTokenExpiration: Date;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin", "rider"],
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordTokenExpiration: Date,
    verificationToken: String,
    verificationTokenExpiration: Date,
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", userSchema);
