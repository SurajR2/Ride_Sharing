import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../zodScheme/zodSchema";
import Ride from "../models/ride.model";

interface requestBody {
  userId: string;
  pickupLocation: { lat: number; lon: number };
  dropoffLocation: { lat: number; lon: number };
  rideType: "economy" | "luxury";
}

interface DecodedToken {
  userId: string;
  iat: number;
  exp: number;
}
export const rideRequest = async (req: Request, res: Response) => {
  try {
    const { token } = req.cookies;
    const { pickupLocation, dropoffLocation, rideType } =
      req.body as requestBody;

    if (!token) {
      res.status(400).json({ success: false, message: "No token provided" });
      return;
    }
    const decoded = jwt.verify(token, env.JWT_SECRET) as DecodedToken;
    const userId = decoded.userId;
    const newRideRequest = new Ride({
      userId,
      pickupLocation,
      dropoffLocation,
      rideType,
      requestedAt: new Date(),
      status: "pending",
    });

    await newRideRequest.save().then(() => {
      console.log("ride request saved");
    });

    res.status(200).json({
      success: true,
      message: "Ride request successfully created.",
      data: { ...newRideRequest.toObject() },
    });

    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Server Error ${error}` });
    return;
  }
};

export const rideRequestById = async (req: Request, res: Response) => {
  try {
    const { rideId } = req.params;
    const rideDetails = await Ride.findById({ _id: rideId });
    if (!rideDetails) {
      res.status(404).json({ success: false, message: "Invalid Ride Id" });
      return;
    }
    res.status(200).json({ success: true, data: rideDetails });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Server Error ${error}` });
    return;
  }
};

export const rideRequestStatus = async (req: Request, res: Response) => {
  const { rideId } = req.params;
  try {
    const { status } = req.body;
    const rideDetails = await Ride.findByIdAndUpdate(
      { _id: rideId },
      { status: status },
      { new: true }
    );
    if (!rideDetails) {
      res.status(404).json({ success: false, message: "Invalid Ride Id" });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Ride Status Update Successfully",
      data: rideDetails,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Server Error ${error}` });
    return;
  }
};
