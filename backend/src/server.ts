import "dotenv/config";
import express, { Express } from "express";
import mongoose from "mongoose";

import env from "../src/util/validateEnv";

import { userRouter } from "./routes/users";
import { unitRouter } from "./routes/unit";
import { activityRouter } from "./routes/activity";
import { lessonRouter } from "./routes/lesson";
import errorHandler from "./middleware/errorHandler";

const app: Express = express();
const port = env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI ?? "";

app.use(express.json());

app.use(userRouter);
app.use("/api/units", unitRouter);
app.use("/api/lessons", lessonRouter);
app.use("/api/activities", activityRouter);

app.use(errorHandler);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch((error: unknown) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${String(port)}`);
});

module.exports = app;
