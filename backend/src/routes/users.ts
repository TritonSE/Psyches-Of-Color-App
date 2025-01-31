import express, { NextFunction, Request, Response } from "express";

import { User } from "../models/users";
import { verifyAuthToken } from "../middleware/auth";

const router = express.Router();

// Email and password
// Firebase takes the email and password
// Generate a token
// Then they will verify this token
// If valid -> give the respective permissions
// If invalid -> return error

//

router.get(
  "/api/whoami",
  verifyAuthToken,
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const uid = req.body.uid;
      const user = await User.findOne({ uid });
      if (!user) {
        res.status(404).json({ error: "User not Found" });
        return;
      }
      const { _id: mongoId } = user;
      res.status(200).send({
        message: "Current user information",
        user: {
          mongoId,
          uid,
        },
      });
      return;
    } catch (e) {
      next();
      console.log(e);
      res.status(400).json({
        error: e,
      });
      return;
    }
  },
);

export { router as userRouter };
