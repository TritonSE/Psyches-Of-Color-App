import { NextFunction, Request, Response } from "express";
import { AuthError } from "src/errors/auth";
import UserModel from "src/models/user";
import { decodeAuthToken } from "src/services/auth";

/**
 * Define this custom type for a request to include the "userUid"
 * property, which middleware will set and validate
 */
export type PsycheRequest = {
  userUid?: string;
} & Request;

/**
 * A middleware that requires the user to be signed in and have a valid Firebase token
 * in the "Authorization" header
 */
const requireSignedIn = async (req: PsycheRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  // Token shoud be "Bearer: <token>"
  const token = authHeader?.split("Bearer ")[1];
  if (!token) {
    return res
      .status(AuthError.TOKEN_NOT_IN_HEADER.status)
      .send(AuthError.TOKEN_NOT_IN_HEADER.displayMessage(true));
  }

  let userInfo;
  try {
    userInfo = await decodeAuthToken(token);
  } catch (e) {
    return res
      .status(AuthError.INVALID_AUTH_TOKEN.status)
      .send(AuthError.INVALID_AUTH_TOKEN.displayMessage(true));
  }

  if (userInfo) {
    req.userUid = userInfo.uid;
    const user = await UserModel.findOne({ uid: userInfo.uid });
    if (!user) {
      return res
        .status(AuthError.USER_NOT_FOUND.status)
        .send(AuthError.USER_NOT_FOUND.displayMessage(true));
    }
    next();
    return;
  }

  return res.status(AuthError.INVALID_AUTH_TOKEN.status).send(AuthError.INVALID_AUTH_TOKEN.message);
};

export { requireSignedIn };
