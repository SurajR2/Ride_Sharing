import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
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

export const User = mongoose.model("User", userSchema);