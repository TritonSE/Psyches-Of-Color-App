import { cleanEnv } from "envalid";
import { url } from "envalid/dist/validators";

const env = cleanEnv(process.env, {
  EXPO_PUBLIC_BACKEND_URI: url(),
});

export default env;
