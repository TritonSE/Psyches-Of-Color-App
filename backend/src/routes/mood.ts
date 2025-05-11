import express, { NextFunction, Response } from "express";
import { Mood } from "../models/mood";

const router = express.Router();

router.post("/logmood", async (req, res) => {
  try {
    const { moodreported, uid } = req.body;

    // Validate required fields
    if (!moodreported || !uid) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // mood field
    const newMood = Mood.build({ moodreported, uid });
    await newMood.save();

    res.status(201).json({ message: "Mood logged successfully", mood: newMood });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: (error as Error).message });
  }
});

export { router as moodRouter };
