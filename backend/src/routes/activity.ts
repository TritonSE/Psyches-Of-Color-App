import express, { NextFunction, Request, Response } from "express";
import { Activity } from "../models/activity";
import createHttpError from "http-errors";
import { createActivityValidator, updateActivityValidator } from "../validators/activity";
import { matchedData, validationResult } from "express-validator";
import validationErrorParser from "../util/validationErrorParser";
import { adminMiddleware, authMiddleware } from "../middleware/auth";
import { Lesson } from "../models/lesson";

const router = express.Router();

// GET single activity by id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
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
  authMiddleware,
  adminMiddleware,
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

      // Add this activity's ID to its parent lesson's activity list
      await Lesson.findByIdAndUpdate(lesson, {
        $push: {
          activities: savedActivity._id,
        },
      });

      res.status(201).json(savedActivity);
    } catch (e) {
      next(e);
    }
  },
);

// PUT route to update an existing activity
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateActivityValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.params;

    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { question, options, affirmation, lesson } = matchedData(req);

      if (!question && !options && !affirmation && !lesson) {
        throw createHttpError(400, "At least one field must be provided for update");
      }

      const activity = await Activity.findById(id);

      if (!activity) {
        throw createHttpError(404, "Activity not found");
      }

      // Only allow updating options if the type is mcq or wwyd
      if (activity.type !== "mcq" && activity.type !== "wwyd" && options) {
        throw createHttpError(400, "options can only be updated for mcq or wwyd activities");
      }

      // // Only allow updating affirmation if the type is reflection
      // if (activity.type !== "reflection" && affirmation) {
      //   throw createHttpError(400, "affirmation can only be updated for reflection activities");
      // }

      // Update the activity fields
      activity.question = question || activity.question;
      activity.options = options || activity.options;
      activity.affirmation = affirmation || activity.affirmation;
      activity.lesson = lesson || activity.lesson;

      const updatedActivity = await activity.save();

      res.status(200).json(updatedActivity);
    } catch (e) {
      next(e);
    }
  },
);

// DELETE route to delete an activity
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedActivity = await Activity.findByIdAndDelete({ _id: id });
      if (deletedActivity === null) {
        throw createHttpError(404, "Activity not found");
      }

      // Remove this activity's ID from its parent lesson's activity list
      await Lesson.findByIdAndUpdate(deletedActivity.lesson, {
        $pull: {
          lessons: deletedActivity._id,
        },
      });

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
);

export { router as activityRouter };
