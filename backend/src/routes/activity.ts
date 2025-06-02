import express, { NextFunction, Request, Response } from "express";
import { Activity } from "../models/activity";
import createHttpError from "http-errors";
import { createActivityValidator } from "../validators/activity";
import validationErrorParser from "../util/validationErrorParser";
import { matchedData, validationResult } from "express-validator";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);

    if (!activity) {
      throw createHttpError(404, "Activity not found");
    }

    res.status(200).json(activity);
  } catch (e) {
    next(e);
  }
});

// POST route to create a new activity
router.post(
  "/",
  createActivityValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { type, question, options, affirmation, lesson } = matchedData(req);

      const newActivity = new Activity({
        type,
        question,
        options,
        affirmation,
        lesson,
      });

      const savedActivity = await newActivity.save();

      res.status(201).json(savedActivity);
    } catch (e) {
      next(e);
    }
  },
);

export { router as activityRouter };
