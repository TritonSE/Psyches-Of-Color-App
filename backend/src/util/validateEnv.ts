import { cleanEnv } from "envalid";
import { email, json, port, str } from "envalid/dist/validators";
export default cleanEnv(process.env, {
  PORT: port(),
  MONGODB_URI: str(), // URI of MongoDB database to use
  // FRONTEND_ORIGIN: str(), // URL of frontend, to allow CORS from frontend
  EMAIL_USER: email(), // Email address to use for sending emails
  // EMAIL_APP_PASSWORD: str(), // App password to use for sending emails
  // BACKEND_FIREBASE_SETTINGS: json(), // Firebase settings for backend, stored as a JSON string
  SERVICE_ACCOUNT_KEY: json(), // Private service account key for backend, stored as a JSON string
});
