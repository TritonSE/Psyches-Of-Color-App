import express, { NextFunction, Request, Response } from "express";

import { verifyAuthToken } from "../middleware/auth";


import { ServiceError } from "../errors/service";
import { User } from "../models/user";


const router = express.Router();

router.get(
  "/api/whoami",
  [verifyAuthToken],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uid = req.body.uid;
      const user = await User.findOne({ uid: uid });
      if (!user) {
        throw ServiceError.USER_NOT_FOUND;
      }
      const { _id: mongoId} = user;
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
      return res.status(400).json({
        error: e,
      });
    }
  },
);

export { router as userRouter };

