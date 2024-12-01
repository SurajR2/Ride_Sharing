import { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../zodScheme/zodSchema";

const SEVEN_DAYS = 7 * 24 * 60 * 60 * 1000;

export const generateTokenAndSetCookie = (
  res: Response,
  userId: NonNullable<unknown>
) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: SEVEN_DAYS,
    secure: env.NODE_ENV === "production",
  });
  return token;
};
