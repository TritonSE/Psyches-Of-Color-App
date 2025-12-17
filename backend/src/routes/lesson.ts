import express, { NextFunction, Request, Response } from "express";
import { Lesson } from "../models/lesson";
import createHttpError from "http-errors";
import { createLessonValidator, updateLessonValidator } from "../validators/lesson";
import { adminMiddleware, authMiddleware } from "../middleware/auth";
import { matchedData, validationResult } from "express-validator";
import validationErrorParser from "../util/validationErrorParser";
import { Unit } from "../models/unit";

const router = express.Router();

// GET single lesson by id with activities populated
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id).populate("activities");

    if (!lesson) {
      throw createHttpError(404, "Lesson not found");
    }

    res.status(200).json(lesson);
  } catch (e) {
    next(e);
  }
});

// POST route to create a new lesson, initializes with an empty activities array
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  createLessonValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { title, description, unit } = matchedData(req);

      const newLesson = new Lesson({
        title,
        description,
        activities: [],
        unit,
        // Make the new lesson appear last in the unit by setting its order to the highest lesson order + 1
        order: ((await Lesson.find({ unit }).sort({ order: -1 }).limit(1))[0]?.order ?? 0) + 1,
      });

      const savedLesson = await newLesson.save();

      // Add this lesson's ID to its parent unit's lesson list
      await Unit.findByIdAndUpdate(unit, {
        $push: {
          lessons: savedLesson._id,
        },
      });

      res.status(201).json(savedLesson);
    } catch (e) {
      next(e);
    }
  },
);

// PUT route to update an existing lesson
router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  updateLessonValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { id } = req.params;
      const { title, description, unit, activities, order } = matchedData(req);

      if (!title && !description && !unit && !activities && !order) {
        throw createHttpError(400, "At least one field must be provided for update");
      }

      const updatedLesson = await Lesson.findByIdAndUpdate(
        id,
        { title, description, unit, activities, order },
        { new: true, runValidators: true },
      );

      if (!updatedLesson) {
        throw createHttpError(404, "Lesson not found");
      }

      res.status(200).json(updatedLesson);
    } catch (e) {
      next(e);
    }
  },
);

// DELETE route to delete a lesson
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedLesson = await Lesson.findByIdAndDelete(id);
      if (deletedLesson === null) {
        throw createHttpError(404, "Lesson not found");
      }

      // Remove this lesson's ID from its parent unit's lesson list
      await Unit.findByIdAndUpdate(deletedLesson.unit, {
        $pull: {
          lessons: deletedLesson._id,
        },
      });

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
);

export { router as lessonRouter };
