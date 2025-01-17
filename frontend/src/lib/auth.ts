/**
 * Provides functions used for user authentication
 */

import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

GoogleSignin.configure({
  webClientId: "795345347789-5l2nmavccplipkl9jj3tgfnsk5u0u690.apps.googleusercontent.com",
});

/**
 * Signs up a user with email and password
 *
 * @param {string} email validated and trimmed user email
 * @param password validated and trimmed password
 * @returns {Promise<FirebaseAuthTypes.User>} authenticated user object,
 *                                            null if an error occurred
 */
export const signUpEmailPassword = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User | null> => {
  try {
    const userCreds = await auth().createUserWithEmailAndPassword(email, password);

    return userCreds.user;
  } catch (error) {
    handleFirebaseAuthError(error as FirebaseAuthTypes.NativeFirebaseAuthError);
  }

  return null;
};

/**
 * Logs in a user with email and password
 *
 * @param {string} email validated and trimmed user email
 * @param {string} password validated and trimmed password
 * @returns {Promise<FirebaseAuthTypes.User>} authenticated user object,
 *                                            null if an error occurred
 */
export const loginEmailPassword = async (
  email: string,
  password: string,
): Promise<FirebaseAuthTypes.User | null> => {
  try {
    const userCreds = await auth().signInWithEmailAndPassword(email, password);

    return userCreds.user;
  } catch (error) {
    handleFirebaseAuthError(error as FirebaseAuthTypes.NativeFirebaseAuthError);
  }

  return null;
};

/**
 * Signs in a user with Google, to be triggered on button press
 *
 * @returns {Promise<FirebaseAuthTypes.User>} authenticated user object,
 *                                            null if an error occurred
 */
export const signInWithGoogle = async (): Promise<FirebaseAuthTypes.User | null> => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

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

  return userCreds.user;
};

/**
 * Logs out the current user
 */
export const logout = async (): Promise<void> => {
  await auth().signOut();
};

/**
 * Handles Firebase Auth errors and (maybe) dispatches messages to the UI
 */
const handleFirebaseAuthError = (error: FirebaseAuthTypes.NativeFirebaseAuthError) => {
  switch (error.code) {
    case "auth/email-already-in-use":
      console.log("Email already in use");
      break;
    case "auth/invalid-email":
      console.log("Invalid email");
      break;
    case "auth/weak-password":
      console.log("Weak password");
      break;
    case "auth/invalid-credential":
      console.log("Invalid credential");
      break;
    default:
      console.log("Unknown error");
      console.log(error);
  }
};
