import { Response, Request, NextFunction } from "express";
import z from "zod";
import {
  rideRequestSchema,
  rideRequestStatusSchema,
} from "../zodScheme/zodSchema";

export const validateRideRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    rideRequestSchema.parse(req.body);
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

export const validateRideRequestStatus = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    rideRequestStatusSchema.parse(req.body);
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
