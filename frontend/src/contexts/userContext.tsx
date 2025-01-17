import auth, { FirebaseAuthTypes, onAuthStateChanged } from "@react-native-firebase/auth";
import { ReactNode, createContext, useState } from "react";

type IUserContext = {
  firebaseUser: FirebaseAuthTypes.User | null;
};

/**
 * A context that provides the current Firebase user data, null if not logged in
 */
export const UserContext = createContext<IUserContext>({
  firebaseUser: null,
});

/**
 * A provider component that handles the logic for supplying the context
 * with its current user
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  onAuthStateChanged(auth(), (user: FirebaseAuthTypes.User) => {
    setFirebaseUser(user);
    setInitialLoading(false);
  });

  if (initialLoading) {
    return;
  }

  return <UserContext.Provider value={{ firebaseUser }}>{children}</UserContext.Provider>;
};
