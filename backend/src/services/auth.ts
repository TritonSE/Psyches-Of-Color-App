import { firebaseAuth } from "../services/firebase";

async function decodeAuthToken(token: string) {
  try {
    const userInfo = await firebaseAuth.verifyIdToken(token);
    return userInfo;
  } catch (e) {
    console.error("Error verifying auth token:", e);
  }
}

export { decodeAuthToken };
