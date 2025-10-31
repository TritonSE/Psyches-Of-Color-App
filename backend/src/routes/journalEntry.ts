import express, { NextFunction, Response } from "express";
import { PsychesRequest, verifyAuthToken } from "../middleware/auth";
import { User } from "../models/users";
import { JournalEntry } from "../models/journalEntry";
import { matchedData, validationResult } from "express-validator";
import validationErrorParser from "../util/validationErrorParser";
import { createJournalEntryValidator } from "../validators/journalEntry";

const router = express.Router();

// Retrieve all of the current user's journal entries
router.get(
  "/",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userUid } = req;
      const user = await User.findOne({ uid: userUid });
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const entries = await JournalEntry.find({ author: user._id });

      res.status(200).json({
        entries: entries.map((entry) => ({
          _id: entry._id.toString(),
          title: entry.title,
          paragraph: entry.paragraph,
          imageUrl: entry.imageUrl,
          createdAt: entry.createdAt,
          updatedAt: entry.updatedAt,
        })),
      });
    } catch (e) {
      next(e);
    }
  },
);

// Create a new journal entry
router.post(
  "/",
  verifyAuthToken,
  createJournalEntryValidator,
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { userUid } = req;
      const user = await User.findOne({ uid: userUid });
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const { title, paragraph, imageUrl } = matchedData(req);

      const newEntry = new JournalEntry({
        author: user._id,
        title,
        paragraph,
        imageUrl,
      });

      const savedActivity = await newEntry.save();

      res.status(201).json(savedActivity);
    } catch (e) {
      next(e);
    }
  },
);

export { router as journalEntriesRouter };
