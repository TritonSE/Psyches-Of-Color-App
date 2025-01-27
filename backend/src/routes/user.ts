import express, { NextFunction, Request, Response } from "express";

import { ServiceError } from "../errors/service";
import { verifyAuthToken } from "../middleware/auth";
import { User } from "../models/user";

const router = express.Router();

router.get(
  "/api/whoami",
  [verifyAuthToken],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uid } = req.body; // Get UID from the request body

      const user = await User.findOne({ uid });
      if (!user) {
        throw ServiceError.USER_NOT_FOUND;
      }

      res.status(200).send({
        message: "Current user information",
        user: {
          mongoId: user._id,
          uid: user.uid,
          email: user.email,
        },
      });
    } catch (e) {
      next(e); // Pass the error to the next middleware
    }
  },
);

export { router as userRouter };
