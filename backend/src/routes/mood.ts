import express, { Request, Response, Router } from "express";
import { Mood } from "../models/mood";

const router: Router = express.Router();

interface MoodRequestBody {
  moodreported: string;
  uid: string;
  date?: string;
}

// POST route to log a new mood
router.post("/api/logmood", async (req: Request, res: Response): Promise<void> => {
  try {
    const { moodreported, uid, date } = req.body as MoodRequestBody;

    // Validate required fields
    if (!moodreported || !uid) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Check if a mood already exists for this user on this date
    const createdAt = date ? new Date(date) : new Date();
    const existingMood = await Mood.findOne({
      uid,
      year: createdAt.getFullYear(),
      month: createdAt.getMonth() + 1,
      day: createdAt.getDate(),
    });

    if (existingMood) {
      // Update the existing mood
      existingMood.moodreported = moodreported;
      await existingMood.save();
      res.status(200).json({ message: "Mood updated successfully", mood: existingMood });
      return;
    }

    // Create and save new mood
    const newMood = Mood.build({
      moodreported,
      uid,
      createdAt: date ? new Date(date) : undefined,
    });
    await newMood.save();

    res.status(201).json({ message: "Mood logged successfully", mood: newMood });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
});

// GET route to fetch moods for a specific user
router.get("/api/user/:uid/moods", async (req: Request, res: Response): Promise<void> => {
  try {
    const { uid } = req.params;

    // Fetch all moods for the user, sorted by creation date
    const moods = await Mood.find({ uid })
      .sort({ createdAt: -1 }) // Sort by most recent first
      .exec();

    res.status(200).json({ moods });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
});

export { router as moodRouter };
