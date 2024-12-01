import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const EnvSchema = z.object({
  DB_URI: z.string().url(),
  PORT: z.string(),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string(),
});

/******Validating Enviroment Variables*******/
export const env = EnvSchema.parse(process.env);

export const signupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  email: z.string().email("The email address is invalid"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const loginSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const rideRequestSchema = z.object({
  pickupLocation: z.object({ lat: z.number(), lon: z.number() }),
  dropoffLocation: z.object({ lat: z.number(), lon: z.number() }),
  rideType: z.enum(["economy", "luxury"]),
});

export const rideRequestStatusSchema = z.object({
  status: z.enum([
    "pending",
    "accepted",
    "rejected",
    "complete",
    "in-progress",
  ]),
});
