import express, { NextFunction, Request, Response } from "express";
import { Unit } from "../models/unit";
import { createUnitValidator } from "../validators/unit";
import validationErrorParser from "../util/validationErrorParser";
import { matchedData, validationResult } from "express-validator";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const units = await Unit.find().populate("lessons");

    res.status(200).json(units);
  } catch (e) {
    next(e);
  }
});

// POST route to create a new unit, initializes with an empty lessons array
router.post(
  "/",
  createUnitValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { title } = matchedData(req);

      const newUnit = new Unit({
        title,
        lessons: [],
      });

      const savedUnit = await newUnit.save();

      res.status(201).json(savedUnit);
    } catch (e) {
      next(e);
    }
  },
);

export { router as unitRouter };
