import auth from "@react-native-firebase/auth";

const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken(); // Get the Firebase ID token
    console.log("User signed in with token:", token);
    return token;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    const token = await userCredential.user.getIdToken(); // Get the Firebase ID token
    console.log("User created and signed in with token:", token);
    return token;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export { signIn, signUp };
