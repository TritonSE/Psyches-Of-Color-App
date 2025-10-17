import express, { NextFunction, Request, Response } from "express";
import { Unit } from "../models/unit";
import { createUnitValidator, updateUnitValidator } from "../validators/unit";
import validationErrorParser from "../util/validationErrorParser";
import { matchedData, validationResult } from "express-validator";
import createHttpError from "http-errors";

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

// PUT route to update an existing unit
router.put(
  "/:id",
  updateUnitValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { id } = req.params;
      const { title, lessons } = matchedData(req);

      if (!title && !lessons) {
        throw createHttpError(400, "At least one field must be provided for update");
      }
      const updatedUnit = await Unit.findByIdAndUpdate(
        id,
        { title, lessons },
        { new: true, runValidators: true },
      );

      if (!updatedUnit) {
        throw createHttpError(404, "Unit not found");
      }
      res.status(200).json(updatedUnit);
    } catch (e) {
      next(e);
    }
  },
);

export { router as unitRouter };
