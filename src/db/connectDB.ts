import mongoose from "mongoose";
import dotenv from "dotenv";
import { env } from "../zodScheme/zodSchema";

dotenv.config();

// const env = EnvSchema.parse(process.env);

export const connectDB = async () => {
  try {
    await mongoose.connect(env.DB_URI);
    console.log("Database connection established successfully");
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    throw new Error(`Error while connecting to MongoDB ${errorMessage}`);
  }
};
