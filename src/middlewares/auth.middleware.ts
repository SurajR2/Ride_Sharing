import { Response, Request, NextFunction } from "express";
import { loginSchema } from "../zodScheme/zodSchema";
import z from "zod";

export const validateSignUp = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        error: error.errors.map((err) => err.message),
      });
      return;
    }
    next(error);
  }
};
