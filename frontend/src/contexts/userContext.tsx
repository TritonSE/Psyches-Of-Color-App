import auth, { FirebaseAuthTypes, onAuthStateChanged } from "@react-native-firebase/auth";
import { ReactNode, createContext, useContext, useState } from "react";

import { getMongoUser } from "@/lib/auth";
import { User } from "@/types";

type UserContext = {
  firebaseUser: FirebaseAuthTypes.User | null;
  mongoUser: User | null;
};

/**
 * A context that provides the current Firebase user data, null if not logged in
 */
export const UserContext = createContext<UserContext>({
  firebaseUser: null,
  mongoUser: null,
});

/**
 * A provider component that handles the logic for supplying the context
 * with its current user
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [mongoUser, setMongoUser] = useState<User | null>(null);

  const updateMongoUser = async () => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      const user = await getMongoUser(token);

      setMongoUser(user);
    } else {
      setMongoUser(null);
    }
  };

  onAuthStateChanged(auth(), (user: FirebaseAuthTypes.User | null) => {
    setFirebaseUser(user);
    void updateMongoUser();
  });

  return (
    <UserContext.Provider value={{ firebaseUser, mongoUser }}>{children}</UserContext.Provider>
  );
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
