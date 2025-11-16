import express, { NextFunction, Request, Response } from "express";
import { Lesson } from "../models/lesson";
import createHttpError from "http-errors";

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

export { router as lessonRouter };
