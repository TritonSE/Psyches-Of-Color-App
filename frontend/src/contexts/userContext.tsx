import { FirebaseAuthTypes, onAuthStateChanged } from "@react-native-firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { getFirebaseAuth, getMongoUser } from "@/lib/auth";
import { User } from "@/types";

type UserContext = {
  firebaseAuth: FirebaseAuthTypes.Module | null;
  firebaseUser: FirebaseAuthTypes.User | null;
  mongoUser: User | null;
  refreshMongoUser: () => Promise<void>;
};

/**
 * A context that provides the current Firebase user data, null if not logged in
 */
export const UserContext = createContext<UserContext>({
  firebaseAuth: null,
  firebaseUser: null,
  mongoUser: null,
  refreshMongoUser: async () => {
    return Promise.resolve();
  },
});

/**
 * A provider component that handles the logic for supplying the context
 * with its current user
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseAuth, setFirebaseAuth] = useState<FirebaseAuthTypes.Module | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [mongoUser, setMongoUser] = useState<User | null>(null);

  const refreshMongoUser = async () => {
    if (firebaseUser) {
      const token = await firebaseUser.getIdToken();
      const user = await getMongoUser(token);

      setMongoUser(user);
    } else {
      setMongoUser(null);
    }
  };

  useEffect(() => {
    if (firebaseAuth) return;
    getFirebaseAuth()
      .then(setFirebaseAuth)
      .catch((error: unknown) => {
        console.error(`Error initializing Firebase: ${String(error)}`);
      });
  }, []);

  useEffect(() => {
    if (!firebaseAuth) return;
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setFirebaseUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, [firebaseAuth]);

  useEffect(() => {
    const updateMongoUser = async () => {
      if (!firebaseUser) return;
      const token = await firebaseUser.getIdToken();
      const user = await getMongoUser(token);
      setMongoUser(user);
    };
    void updateMongoUser();
  }, [firebaseUser]);

  return (
    <UserContext.Provider value={{ firebaseAuth, firebaseUser, mongoUser, refreshMongoUser }}>
      {children}
    </UserContext.Provider>
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
