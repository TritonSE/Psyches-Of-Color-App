import express, { NextFunction, Request, Response } from "express";
import { Lesson } from "../models/lesson";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const lesson = await Lesson.findById(id).populate("activities");
    if (!lesson) {
      res.status(404).json({
        error: "Lesson not found",
      });
      return;
    }

    res.status(200).json(lesson);
    return;
  } catch (e) {
    next();
    console.log(e);
    res.status(400).json({
      error: e,
    });
    return;
  }
});

export { router as lessonRouter };
