import { NextFunction, Request, Response } from "express";

import { decodeAuthToken } from "../services/auth";

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.split(" ")[0] === "Bearer" ? authHeader.split(" ")[1] : null;
  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  let userInfo;
  try {
    userInfo = await decodeAuthToken(token);
  } catch (e) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  if (userInfo) {
    req.body.uid = userInfo.uid;
    next();
    return;
  }

  return res.status(403).json({ error: "Invalid or expired token" });
};

export { verifyAuthToken };
