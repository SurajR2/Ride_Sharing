import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../zodScheme/zodSchema";
type requestBody = {
  userId: string;
  pickupLocation: { lat: number; lon: number };
  dropoffLocation: { lat: number; lon: number };
  ridetype: "economy" | "luxury";
};

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}
export const rideRequest = (req: Request, res: Response) => {
  const { token } = req.cookies;
  const { pickupLocation, dropoffLocation, ridetype } = req.body as requestBody;

  if (!token) {
    res.status(400).json({ success: false, message: "No token provided" });
    return;
  }
  const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
  if (!decoded) {
    res
      .status(401)
      .json({ success: false, message: "unauthorized - invalid token" });
    return;
  }

  const userId = decoded.userId;
  //TODO: check if userId is valid and update ride model
  //TODO : add validation middleware using zod

  res
    .status(200)
    .json({ success: true, message: "Ride request submitted successfully." });
  return;
};
