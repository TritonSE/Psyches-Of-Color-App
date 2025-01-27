import { AuthError } from "../errors/auth";

import { firebaseAuth } from "./firebase";

async function decodeAuthToken(token: string) {
  try {
    const userInfo = await firebaseAuth.verifyIdToken(token);
    return userInfo;
  } catch (e) {
    throw AuthError.DECODE_ERROR;
  }
}

export { decodeAuthToken };
