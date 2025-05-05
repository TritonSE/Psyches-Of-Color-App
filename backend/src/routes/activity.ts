import express, { NextFunction, Request, Response } from "express";
import { Activity } from "../models/activity";

const router = express.Router();

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { id } = req.params;

  try {
    const activity = await Activity.findById(id).populate("questions");

    if (!activity) {
      res.status(404).json({
        error: "Activity not found",
      });
      return;
    }

    res.status(200).send(activity);
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

export { router as activityRouter };
