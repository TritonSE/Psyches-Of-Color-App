import { NextFunction, Request, Response } from "express";

import { decodeAuthToken } from "../services/auth";

const verifyAuthToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;
  const token =
    authHeader && authHeader.split(" ")[0] === "Bearer" ? authHeader.split(" ")[1] : null;
  if (!token) {
    res.status(401).json({ error: "Unauthorized: No token provided" });
    return;
  }

  let userInfo;
  try {
    userInfo = await decodeAuthToken(token);
  } catch (e) {
    res.status(403).json({ error: "Invalid or expired token", e });
    return;
  }

  if (userInfo) {
    req.body.uid = userInfo.uid;
    console.log(req.body.uid);
    next();
    return;
  }

  res.status(403).json({ error: "Invalid or expired token" });
  return;
};

export { verifyAuthToken };
