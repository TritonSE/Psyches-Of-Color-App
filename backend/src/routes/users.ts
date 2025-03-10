import express, { NextFunction, Response } from "express";

import { PsychesRequest, verifyAuthToken } from "../middleware/auth";
import { User } from "../models/users";

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
  async (req: PsychesRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { userUid } = req;
      const user = await User.findOne({ uid: userUid });
      if (!user) {
        res.status(404).json({ error: "User not Found" });
        return;
      }
      const { _id: mongoId, uid } = user;
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
