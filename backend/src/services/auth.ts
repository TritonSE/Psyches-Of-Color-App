import { firebaseAuth } from "src/services/firebase";

async function decodeAuthToken(token: string) {
  try {
    const userInfo = await firebaseAuth.verifyIdToken(token);
    return userInfo;
  } catch (e) {
    console.error("Error verifying auth token:", e);
  }
}

export { decodeAuthToken };
