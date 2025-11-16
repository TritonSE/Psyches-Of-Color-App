import express, { NextFunction, Request, Response } from "express";
import { Activity } from "../models/activity";
import createHttpError from "http-errors";

const router = express.Router();

// GET single activity by id
router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id);

    if (!activity) {
      throw createHttpError(404, "Activity not found");
    }

    res.status(200).json(activity);
  } catch (e) {
    next(e);
  }
});

export { router as activityRouter };
