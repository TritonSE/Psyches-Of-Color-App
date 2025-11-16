import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";

import env from "../src/util/validateEnv";
import { userRouter } from "../src/routes/users";
import { moodRouter } from "../src/routes/mood";
import { unitRouter } from "../src/routes/unit";
import { activityRouter } from "../src/routes/activity";
import { journalEntriesRouter } from "../src/routes/journalEntry";
import { lessonRouter } from "../src/routes/lesson";
import errorHandler from "../src/middleware/errorHandler";
import { Request, Response } from "express";

const app: Express = express();
const port = env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI ?? "";

// Enable CORS with specific options
app.use(
  cors({
    origin: ["http://localhost:8081", "http://localhost:19006", "exp://localhost:19000"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse JSON bodies
app.use(express.json());

// Mount routers
app.use(moodRouter);
app.use(userRouter);
app.use("/api/units", unitRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/activities", activityRouter);
app.use("/api/journalEntries", journalEntriesRouter);

app.use(errorHandler);

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Start server
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

module.exports = app;
