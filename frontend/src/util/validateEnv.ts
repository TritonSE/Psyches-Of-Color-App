import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";

export default cleanEnv(process.env, {
  EXPO_PUBLIC_BACKEND_URI: str(), // URL of backend, to send FCM token to
});
