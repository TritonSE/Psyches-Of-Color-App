import express, { NextFunction, Request, Response } from "express";
import { Unit } from "../models/unit";

const router = express.Router();

// GET all units with lessons populated and their activities populated
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const units = await Unit.find().populate({
      path: "lessons",
      populate: { path: "activities" },
    });

    res.status(200).json(units);
  } catch (e) {
    next(e);
  }
});

export { router as unitRouter };
