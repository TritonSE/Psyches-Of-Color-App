import mongoose from "mongoose";
import { Mood } from "../models/mood";
import dotenv from "dotenv";

dotenv.config();

async function cleanupDuplicateMoods() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/psyches-of-color");
    console.log("Connected to MongoDB");

    // Get all users
    const users = await Mood.distinct("uid");

    for (const uid of users) {
      // Get all moods for each user
      const moods = await Mood.find({ uid }).sort({ createdAt: -1 });

      // Keep track of processed dates
      const processedDates = new Set<string>();

      for (const mood of moods) {
        const dateKey = `${mood.year}-${mood.month}-${mood.day}`;

        if (processedDates.has(dateKey)) {
          // This is a duplicate, delete it
          console.log(`Deleting duplicate mood for user ${uid} on ${dateKey}`);
          await Mood.deleteOne({ _id: mood._id });
        } else {
          // This is the first/latest mood for this date
          processedDates.add(dateKey);
        }
      }
    }

    console.log("Cleanup completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  }
}

cleanupDuplicateMoods();
