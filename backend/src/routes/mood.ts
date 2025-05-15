import express, { Request, Response } from "express";
import { Mood } from "../models/mood";

const router = express.Router();

// POST route to log a new mood
router.post("/api/logmood", async (req: Request, res: Response) => {
  try {
    const { moodreported, uid } = req.body;

    // Validate required fields
    if (!moodreported || !uid) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Create and save new mood
    const newMood = Mood.build({ moodreported, uid });
    await newMood.save();

    res.status(201).json({ message: "Mood logged successfully", mood: newMood });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
});

// GET route to fetch moods for a specific user
router.get("/api/user/:uid/moods", async (req: Request, res: Response) => {
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
