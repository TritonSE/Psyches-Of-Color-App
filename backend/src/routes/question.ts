import express, { NextFunction, Request, Response } from "express";
import { Question } from "../models/question";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const question = await Question.findById(id);

    if (!question) {
      res.status(404).json({
        error: "Question not found",
      });
      return;
    }

    res.status(200).send(question);
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

export { router as questionRouter };
