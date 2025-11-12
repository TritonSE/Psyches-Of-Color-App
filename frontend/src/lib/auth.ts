/**
 * Provides functions used for user authentication
 */

import { User } from "@/types";
import env from "@/util/validateEnv";
import auth, {
  createUserWithEmailAndPassword,
  FirebaseAuthTypes,
  getAuth,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signInWithCredential,
  signInWithEmailAndPassword,
  signOut,
} from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Removes warnings from react native firebase
// We're already using their modular SDK but still getting warnings for some reason
(globalThis as any).RNFB_SILENCE_MODULAR_DEPRECATION_WARNINGS = true;

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

export const createMongoUser = async ({ name, email }: { name: string; email: string }) => {
  const firebaseUser = auth().currentUser;
  const idToken = await firebaseUser?.getIdToken();

  if (!firebaseUser || !idToken) return null;

  const res = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${idToken}`,
    },
    body: JSON.stringify({
      name,
      email,
      uid: firebaseUser.uid,
    }),
  });
  if (!res.ok) {
    return null;
  }
  return (await res.json()).user as User;
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
    const userCreds = await createUserWithEmailAndPassword(getAuth(), email, password);

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
    const userCreds = await signInWithEmailAndPassword(getAuth(), email, password);

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
 * If user doesn't exist in MongoDB, attempts to create one
 */
export const getMongoUser = async (idToken: string): Promise<User | null> => {
  try {
    const response = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/api/whoami`, {
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });
    if (response.ok) {
      const user = (await response.json()) as User;

      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error sending token to backend: ", error);

    return null;
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

    const googleCredential = GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    const userCreds = await signInWithCredential(getAuth(), googleCredential);

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
  await signOut(getAuth());
};

/**
 * Deletes the current user's account from both Firebase and MongoDB
 *
 * @returns {Promise<{ success: boolean; error?: string }>}
 */
export const deleteAccount = async (): Promise<{ success: boolean; error?: string }> => {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      return {
        success: false,
        error: "No user is currently signed in",
      };
    }

    // Get the user's ID token for backend authentication
    const idToken = await user.getIdToken();

    // Delete user from MongoDB backend
    const response = await fetch(`${env.EXPO_PUBLIC_BACKEND_URI}/users/${user.uid}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${idToken}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.message || "Failed to delete user from database",
      };
    }

    // Delete user from Firebase Authentication
    await user.delete();

    return {
      success: true,
    };
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error deleting account:", err);
    return {
      success: false,
      error: err.message || "An error occurred while deleting the account",
    };
  }
};

/**
 * Send a password reset email to the user
 *
 * @param {string} email validated and trimmed user email
 * @returns {Promise<EmailSendResponse>}
 */
export const forgotPassword = async (email: string): Promise<EmailSendResponse> => {
  try {
    await sendPasswordResetEmail(getAuth(), email);

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
