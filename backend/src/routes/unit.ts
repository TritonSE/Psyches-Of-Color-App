import express, { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Unit } from "../models/unit";
import { createUnitValidator, updateUnitValidator } from "src/validators/unit";
import { matchedData, validationResult } from "express-validator";
import validationErrorParser from "src/util/validationErrorParser";
import { adminMiddleware, authMiddleware } from "src/middleware/auth";

const router = express.Router();

// GET all units with lessons populated and their activities populated
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    // ADD .sort('order') HERE
    const units = await Unit.find()
      .sort({ order: 1 }) // <--- 1 = Ascending (1, 2, 3), -1 = Descending
      .populate({
        path: "lessons",
        options: { sort: { order: 1 } }, // <--- Sort lessons inside the unit too!
        populate: { path: "activities" },
      });

    res.status(200).json(units);
  } catch (e) {
    next(e);
  }
});

// POST route to create a new unit, initializes with an empty lessons array
router.post(
  "/",
  authMiddleware,
  adminMiddleware,
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
        // Make the new unit appear last by setting its order to the highest unit order + 1
        order: ((await Unit.find().sort({ order: -1 }).limit(1))[0]?.order ?? 0) + 1,
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
  authMiddleware,
  adminMiddleware,
  updateUnitValidator,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        validationErrorParser(errors);
      }

      const { id } = req.params;
      const { title, lessons, order } = matchedData(req);

      if (!title && !lessons && !order) {
        throw createHttpError(400, "At least one field must be provided for update");
      }
      const updatedUnit = await Unit.findByIdAndUpdate(
        id,
        { title, lessons, order },
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

// DELETE route to delete a unit
router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.params;
      const deletedUnit = await Unit.deleteOne({ _id: id });
      if (deletedUnit.deletedCount === 0) {
        throw createHttpError(404, "Unit not found");
      }

      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },
);

export { router as unitRouter };
