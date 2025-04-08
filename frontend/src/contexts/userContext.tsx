import auth, { FirebaseAuthTypes, onAuthStateChanged } from "@react-native-firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";

type UserContext = {
  firebaseUser: FirebaseAuthTypes.User | null;
};

/**
 * A context that provides the current Firebase user data, null if not logged in
 */
export const UserContext = createContext<UserContext>({
  firebaseUser: null,
});

/**
 * A provider component that handles the logic for supplying the context
 * with its current user
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);

  onAuthStateChanged(auth(), (user: FirebaseAuthTypes.User) => {
    setFirebaseUser(user);
  });

  return <UserContext.Provider value={{ firebaseUser }}>{children}</UserContext.Provider>;
};

/**
 * A custom hook to access the UserContext
 */
export const useAuth = (): UserContext => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }

  return context;
};
