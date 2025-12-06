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

      const filterObject: {
        author: string;
        createdAt?: {
          $gte: Date;
          $lte: Date;
        };
      } = { author: user._id as string };
      // Optionally filter by time range
      if (req.query.createdAtGte && req.query.createdAtLte) {
        filterObject.createdAt = {
          $gte: new Date(req.query.createdAtGte as string),
          $lte: new Date(req.query.createdAtLte as string),
        };
      }

      const entries = await JournalEntry.find(filterObject);

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

// Get one journal entry by ID
router.get(
  "/:id",
  verifyAuthToken,
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { userUid } = req;
      const user = await User.findOne({ uid: userUid });
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const entry = await JournalEntry.findOne({ _id: id, author: user._id });
      if (!entry) {
        res.status(404).json({ message: "Entry not found or unauthorized" });
        return;
      }

      res.status(200).json({
        _id: entry._id.toString(),
        title: entry.title,
        paragraph: entry.paragraph,
        imageUrl: entry.imageUrl,
        createdAt: entry.createdAt,
        updatedAt: entry.updatedAt,
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

// Update a journal entry
router.patch(
  "/:id",
  verifyAuthToken,
  createJournalEntryValidator,
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const { userUid } = req;
      const user = await User.findOne({ uid: userUid });
      if (!user) {
        res.status(400).json({ message: "User not found" });
        return;
      }

      const entry = await JournalEntry.findOne({ _id: id, author: user._id });
      if (!entry) {
        res.status(404).json({ message: "Entry not found or unauthorized" });
        return;
      }

      const { title, paragraph, imageUrl } = req.body;

      if (title !== undefined) entry.title = title;
      if (paragraph !== undefined) entry.paragraph = paragraph;
      if (imageUrl !== undefined) entry.imageUrl = imageUrl;

      entry.updatedAt = new Date();

      const updatedEntry = await entry.save();

      res.status(200).json({
        _id: updatedEntry._id.toString(),
        title: updatedEntry.title,
        paragraph: updatedEntry.paragraph,
        imageUrl: updatedEntry.imageUrl,
        createdAt: updatedEntry.createdAt,
        updatedAt: updatedEntry.updatedAt,
      });
    } catch (e) {
      next(e);
    }
  },
);

export { router as journalEntriesRouter };
