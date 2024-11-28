import express from "express";
const router = express.Router();
import { signup, login } from "../controllers/auth.controller";
import { validateLogin, validateSignUp } from "../middlewares/auth.middleware";

router.post("/signup", validateSignUp, signup);
router.post("/login", validateLogin, login);

export default router;
