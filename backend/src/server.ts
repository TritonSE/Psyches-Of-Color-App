// /* eslint-disable */

import "dotenv/config";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";
import { userRouter } from "./routes/users";

//dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || "";

app.use(express.json());
app.use(userRouter);

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
