/* eslint-disable */

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined in .env file.");
  process.exit(1); // Exit the app if MONGO_URI is not defined
}

const app: Express = express();
const port = process.env.PORT || 3000;
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("[database]: Connected to MongoDB successfully!");
  })
  .catch((err) => {
    console.error("[database]: Failed to connect to MongoDB", err.message);
    process.exit(1); // Exit the app on database connection error
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
