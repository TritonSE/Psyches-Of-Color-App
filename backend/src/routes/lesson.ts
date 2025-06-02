import express, { NextFunction, Request, Response } from "express";
import { Lesson } from "../models/lesson";
import createHttpError from "http-errors";
import { createLessonValidator } from "../validators/lesson";
import { matchedData, validationResult } from "express-validator";
import validationErrorParser from "../util/validationErrorParser";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id).populate("activities");

    if (!lesson) {
      next(createHttpError(404, "Lesson not found"));
    }

    res.status(200).json(lesson);
  } catch (e) {
    next(e);
  }
});

// POST route to create a new lesson, initializes with an empty activities array
router.post(
  "/",
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
      });

      const savedLesson = await newLesson.save();

      res.status(201).json(savedLesson);
    } catch (e) {
      next(e);
    }
  },
);

export { router as lessonRouter };
