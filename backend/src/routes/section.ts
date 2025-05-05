import express, { NextFunction, Request, Response } from "express";
import { Section } from "../models/section";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const sections = await Section.find().populate("activities");

    res.status(200).send(sections);
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

export { router as sectionRouter };
