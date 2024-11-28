import express from "express";
import { Request, Response, NextFunction } from "express";
import { configDotenv } from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
configDotenv();

import { connectDB } from "./db/connectDB";

import authRoutes from "./routes/auth.routes";
import ridesRoutes from "./routes/rides.routes";

const port = process.env.port || 3000;

(() => {
  connectDB();
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
})();

app.get("/", (req: Request, res: Response) => {
  res.send("The api is working properly ");
});
app.use("/api/auth", authRoutes);
app.use("/api/rides", ridesRoutes);
