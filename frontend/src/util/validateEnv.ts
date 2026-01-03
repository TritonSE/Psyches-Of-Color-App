import { cleanEnv } from "envalid";
import { str, url } from "envalid/dist/validators";
import Constants from 'expo-constants'

// Validate environment variables
// Expo SDK 52 automatically loads .env files for EXPO_PUBLIC_ variables
// For development on iOS simulator, use http://localhost:3000
// For development on physical device, use your computer's local IP (e.g., http://192.168.1.100:3000)
const env = cleanEnv(
  Constants.expoConfig?.extra,
  {
    EXPO_PUBLIC_BACKEND_URI: url({
      default: "http://localhost:3000",
      desc: "Backend API URI - should be set in .env file in frontend directory",
    }),
    EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID: str({
      desc: "Web client ID to use for Google Sign-in - get this from the Firebase console under Authentication -> Sign in methods -> Google",
    }),
  },
  {
    // Provide a helpful error message if validation fails
    reporter: ({ errors }) => {
      if (Object.keys(errors).length > 0) {
        console.error("Environment validation errors:", errors);
        console.error(
          "Please ensure EXPO_PUBLIC_BACKEND_URI is set in your .env file in the frontend directory.",
        );
      }
    },
  },
);

export default env;
