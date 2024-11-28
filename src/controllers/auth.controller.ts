import { User } from "../models/user.model";
import { Request, Response } from "express";
import { signupSchema, loginSchema } from "../zodScheme/zodSchema";

import bcryptjs from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";

/****************Signup Controller*****************/
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    const validatedData = signupSchema.parse({ username, email, password });

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      res.status(400).json({ success: false, error: "User already exists" });
      return;
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username: validatedData.username,
      email: validatedData.email,
      password: hashedPassword,
    });
    await newUser.save();

    generateTokenAndSetCookie(res, newUser._id);

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      success: true,
      message: "user created successfully",
      user: userWithoutPassword,
    });
    return;
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(err);
    res.status(400).json({ sucess: false, error: errorMessage });
    return;
  }
};

/***************Login Controller**************/

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });

    if (!user) {
      res.status(404).json({ sucess: false, message: "User not found." });
      return;
    }
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(401).json({ success: false, message: "Invalid Password" });
      return;
    }
    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({ success: true, message: "Logged in successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: `Server Error ${error}` });
    return;
  }
};
