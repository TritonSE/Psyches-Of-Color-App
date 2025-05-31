import express, { NextFunction, Request, Response } from "express";
import { Unit } from "../models/unit";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const units = await Unit.find().populate("lessons");

    res.status(200).json(units);
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

export { router as unitRouter };
