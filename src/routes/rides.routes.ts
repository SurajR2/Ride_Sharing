import express from "express";

const router = express.Router();

import {
  rideRequest,
  rideRequestById,
  rideRequestStatus,
} from "../controllers/ride.controller";
import {
  validateRideRequest,
  validateRideRequestStatus,
} from "../middlewares/ride.middleware";

router.post("/request", validateRideRequest, rideRequest);
router.get("/:rideId", rideRequestById);
router.patch("/:rideId/status", validateRideRequestStatus, rideRequestStatus);

export default router;
