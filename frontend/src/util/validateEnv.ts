import { cleanEnv } from "envalid";
import { str } from "envalid/dist/validators";

// Validate environment variables
// Expo SDK 52 automatically loads .env files for EXPO_PUBLIC_ variables
// For development on iOS simulator, use http://localhost:3000
// For development on physical device, use your computer's local IP (e.g., http://192.168.1.100:3000)
const env = cleanEnv(
  process.env,
  {
    EXPO_PUBLIC_BACKEND_URI: str({
      default: "http://localhost:3000",
      desc: "Backend API URI - should be set in .env file in frontend directory",
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

// Validate URL format and warn if invalid
try {
  new URL(env.EXPO_PUBLIC_BACKEND_URI);
} catch {
  console.error(
    `Error: EXPO_PUBLIC_BACKEND_URI "${env.EXPO_PUBLIC_BACKEND_URI}" is not a valid URL format.`,
  );
  console.error(
    "Please set EXPO_PUBLIC_BACKEND_URI in your .env file (e.g., EXPO_PUBLIC_BACKEND_URI=http://localhost:3000)",
  );
}

export default env;
