import express, { NextFunction, Request, Response } from "express";
import { Lesson } from "../models/lesson";
import createHttpError from "http-errors";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

// Uncomment these routes if needed for admin portal in future, but add auth checks first!
// // POST route to create a new lesson, initializes with an empty activities array
// router.post(
//   "/",
//   createLessonValidator,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         validationErrorParser(errors);
//       }

//       const { title, description, unit } = matchedData(req);

//       const newLesson = new Lesson({
//         title,
//         description,
//         activities: [],
//         unit,
//       });

//       const savedLesson = await newLesson.save();

//       res.status(201).json(savedLesson);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

// // PUT route to update an existing lesson
// router.put(
//   "/:id",
//   updateLessonValidator,
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const errors = validationResult(req);

//       if (!errors.isEmpty()) {
//         validationErrorParser(errors);
//       }

//       const { id } = req.params;
//       const { title, description, unit, activities } = matchedData(req);

//       if (!title && !description && !unit && !activities) {
//         throw createHttpError(400, "At least one field must be provided for update");
//       }

//       const updatedLesson = await Lesson.findByIdAndUpdate(
//         id,
//         { title, description, unit, activities },
//         { new: true, runValidators: true },
//       );

//       if (!updatedLesson) {
//         throw createHttpError(404, "Lesson not found");
//       }

//       res.status(200).json(updatedLesson);
//     } catch (e) {
//       next(e);
//     }
//   },
// );

export { router as lessonRouter };
