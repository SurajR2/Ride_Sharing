import mongoose, { Document, Schema } from "mongoose";

type Location = {
  lat: Number;
  lon: Number;
};

interface IRide extends Document {
  rideId: string;
  status: "pending" | "accepted" | "rejected" | "complete" | "in-progress";
  userId: mongoose.Schema.Types.ObjectId;
  pickupLocation: Location;
  dropoffLocation: Location;
  rideType: "economy" | "luxury";
  requestedAt: Date;
}

const RideSchema = new Schema<IRide>({
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected", "completed", "in-progress"],
    default: "pending",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  pickupLocation: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  dropoffLocation: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  rideType: {
    type: String,
    enum: ["economy", "luxury"],
    default: "economy",
  },
  requestedAt: {
    type: Date,
    default: Date.now,
  },
});

const Ride = mongoose.model<IRide>("Ride", RideSchema);

export default Ride;
