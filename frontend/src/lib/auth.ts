/**
 * Provides functions used for user authentication
 */

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "795345347789-bbejfenj4bfe0vv8ar2uka2nhui4dhjm.apps.googleusercontent.com",
});

type AuthResponse =
  | {
      success: true;
      user: FirebaseAuthTypes.User;
      error?: never;
    }
  | {
      success: false;
      error: FirebaseError;
      user?: never;
    };

type EmailSendResponse =
  | {
      success: true;
      error?: never;
    }
  | {
      success: false;
      error: FirebaseError;
    };

type FirebaseError = {
  field: "email" | "password" | "unknown";
  message: string;
};

/**
 * Signs up a user with email and password
 *
 * @param {string} email validated and trimmed user email
 * @param password validated and trimmed password
 * @returns {Promise<AuthResponse>}
 */
export const signUpEmailPassword = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const userCreds = await auth().createUserWithEmailAndPassword(email, password);

    return {
      success: true,
      user: userCreds.user,
    };
  } catch (error) {
    return {
      success: false,
      error: parseFirebaseAuthError(error as FirebaseAuthTypes.NativeFirebaseAuthError),
    };
  }
};

/**
 * Logs in a user with email and password
 *
 * @param {string} email validated and trimmed user email
 * @param {string} password validated and trimmed password
 * @returns {Promise<AuthResponse>}
 */
export const loginEmailPassword = async (
  email: string,
  password: string,
): Promise<AuthResponse> => {
  try {
    const userCreds = await auth().signInWithEmailAndPassword(email, password);
    const idToken = await userCreds.user?.getIdToken();
    // REMOVE CONSOLE.LOG BELOW AFTER TESTING
    console.log(idToken);
    await sendTokenToBackend(idToken);
    return {
      success: true,
      user: userCreds.user,
    };
  } catch (error) {
    return {
      success: false,
      error: parseFirebaseAuthError(error as FirebaseAuthTypes.NativeFirebaseAuthError),
    };
  }
};

/*
 * Sends the Firebase ID token to the backend on the whoami route
 */
const sendTokenToBackend = async (idToken: string) => {
  try {
    // 10.0.2.2:3000 for android emulators
    // localhost:3000 for ios
    // Or just use "http://192.168.x.x:3000/api/whoami" (ip address)
    const response = await fetch("http://10.0.2.2:3000/api/whoami", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${idToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const userInfo = await response.json();
      console.log(userInfo);
    } else {
      console.error("Failed to get user info from JWT Token");
    }
  } catch (error) {
    console.error("Error sending token to backend: ", error);
  }
};

/**
 * Signs in a user with Google, to be triggered on button press
 *
 * @returns {Promise<AuthResponse>}
 *
 */
export const signInWithGoogle = async (): Promise<AuthResponse> => {
  try {
    // Check if your device supports Google Play
    const hasGoogleServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true,
    });

    if (!hasGoogleServices) {
      throw new Error("Google Play Services are not available");
    }

    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    const idToken = signInResult.data?.idToken;

    if (!idToken) {
      throw new Error("No ID token found");
    }

    // eslint-disable-next-line import/no-named-as-default-member
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCreds = await auth().signInWithCredential(googleCredential);

    return {
      success: true,
      user: userCreds.user,
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.log(err);
    return {
      success: false,
      error: {
        field: "unknown",
        message: err.message,
      },
    };
  }
};

/**
 * Logs out the current user
 *
 * @returns {Promise<void>}
 */
export const logout = async (): Promise<void> => {
  await auth().signOut();
};

/**
 * Send a password reset email to the user
 *
 * @param {string} email validated and trimmed user email
 * @returns {Promise<EmailSendResponse>}
 */
export const forgotPassword = async (email: string): Promise<EmailSendResponse> => {
  try {
    await auth().sendPasswordResetEmail(email);

    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: parseFirebaseAuthError(error as FirebaseAuthTypes.NativeFirebaseAuthError),
    };
  }
};

/**
 * Handles Firebase Auth errors and (maybe) dispatches messages to the UI
 */
const parseFirebaseAuthError = (
  error: FirebaseAuthTypes.NativeFirebaseAuthError,
): FirebaseError => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return {
        field: "email",
        message: "Email already in use",
      };
    case "auth/invalid-email":
      return {
        field: "email",
        message: "Invalid email",
      };
    case "auth/weak-password":
      return {
        field: "password",
        message: "Weak password",
      };
    case "auth/invalid-credential":
      return {
        field: "unknown",
        message: "Invalid credential",
      };
    case "auth/user-not-found":
      return {
        field: "email",
        message: "User not found",
      };
    default:
      console.log(error);
      return {
        field: "unknown",
        message: "An unknown error occurred",
      };
  }
};
