import { NextFunction, Request, Response } from "express";

import { decodeAuthToken } from "../services/auth";

export type PsychesRequest = {
  userUid?: string;
} & Request;

// DEV ONLY: Skip authentication when enabled
// ⚠️ NEVER SET THIS TO TRUE IN PRODUCTION ⚠️
const DEV_SKIP_AUTH = process.env.DEV_SKIP_AUTH === "true";

if (DEV_SKIP_AUTH) {
  console.warn("\n⚠️  ============================================");
  console.warn("⚠️  WARNING: DEV_SKIP_AUTH IS ENABLED!");
  console.warn("⚠️  Authentication is BYPASSED!");
  console.warn("⚠️  NEVER use this in production!");
  console.warn("⚠️  ============================================\n");
}

const verifyAuthToken = async (
  req: PsychesRequest,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  // DEV ONLY: Bypass authentication
  if (DEV_SKIP_AUTH) {
    console.warn("⚠️  DEV MODE: Skipping auth verification for request");
    req.userUid = "dev-user"; // Use a dummy UID for dev mode
    next();
    return;
  }

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
    req.userUid = userInfo.uid;
    next();
    return;
  }

  res.status(403).json({ error: "Invalid or expired token" });
  return;
};

export { verifyAuthToken, verifyAuthToken as authMiddleware };
