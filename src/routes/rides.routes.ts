import express from "express";

const router = express.Router();

import { rideRequest } from "../controllers/ride.controller";

router.post("/request", rideRequest);

export default router;
