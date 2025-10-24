import { cleanEnv } from "envalid";
import { str, url } from "envalid/dist/validators";

const env = cleanEnv(process.env, {
  EXPO_PUBLIC_BACKEND_URI: url(),
  EXPO_PUBLIC_FIREBASE_SETTINGS: str(),
});

export default env;
