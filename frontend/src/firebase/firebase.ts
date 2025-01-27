import firebase from "@react-native-firebase/app";
import "@react-native-firebase/auth";
import Config from "react-native-config";

// Check if Firebase configuration is available
if (!Config.FIREBASE_IOS_API_KEY || !Config.FIREBASE_PROJECT_ID || !Config.FIREBASE_APP_ID) {
  throw new Error("Firebase configuration is missing. Please check your .env file.");
}

const firebaseConfig = {
  apiKey: Config.FIREBASE_IOS_API_KEY,
  projectId: Config.FIREBASE_PROJECT_ID,
  appId: Config.FIREBASE_APP_ID,
  messagingSenderId: Config.FIREBASE_MESSAGING_SENDER_ID,
  storageBucket: Config.FIREBASE_STORAGE_BUCKET,
};

// Initialize Firebase function with async/await
export const initializeFirebase = async () => {
  try {
    if (!firebase.apps.length) {
      await firebase.initializeApp(firebaseConfig); // Use await to handle the promise
      console.log("Firebase initialized successfully");
    } else {
      firebase.app(); // Use the existing Firebase app if it's already initialized
    }
  } catch (error) {
    console.error("Error initializing Firebase: ", error); // Handle initialization errors
  }
};

initializeFirebase();
// export const initFirebase = () => {
//   if (!env.NEXT_PUBLIC_FIREBASE_SETTINGS) {
//     throw new Error("Cannot get firebase settings");
//   }

//   const firebaseConfig = env.NEXT_PUBLIC_FIREBASE_SETTINGS;

//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);

//   return { app, auth };
// };
