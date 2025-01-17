import { RequestHandler } from "express";
import { PsycheRequest } from "src/middleware/auth";
import UserModel from "src/models/user";

/**
 * Retrieves data about the current user (their MongoDB ID, Firebase UID, and role).
 * Requires the user to be signed in.
 */
export const getWhoAmI: RequestHandler = async (req: PsycheRequest, res, next) => {
  try {
    const { userUid } = req;
    const user = await UserModel.findOne({ uid: userUid });
    const { _id, uid, role } = user!;
    res.status(200).send({
      _id,
      uid,
      role,
    });
  } catch (error) {
    next(error);
  }
};
