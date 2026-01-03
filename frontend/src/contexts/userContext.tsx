import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { getMongoUser } from "@/lib/auth";
import { User } from "@/types";

type UserContext = {
  loadingUser: boolean;
  firebaseUser: FirebaseAuthTypes.User | null;
  mongoUser: User | null;
  setMongoUser: (mongoUser: User | null) => unknown;
  refreshMongoUser: () => Promise<void>;
};

/**
 * A context that provides the current Firebase user data, null if not logged in
 */
export const UserContext = createContext<UserContext>({
  loadingUser: true,
  firebaseUser: null,
  mongoUser: null,
  setMongoUser: () => {
    return;
  },
  refreshMongoUser: async () => {
    return Promise.resolve();
  },
});

/**
 * A provider component that handles the logic for supplying the context
 * with its current user
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [loadingUser, setLoadingUser] = useState(true);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [mongoUser, setMongoUser] = useState<User | null>(null);

  const refreshMongoUser = async () => {
    setMongoUser(mongoUser);
    try {
      if (firebaseUser) {
        const token = await firebaseUser.getIdToken();
        const user = await getMongoUser(token);

        setMongoUser(user);
      } else {
        setMongoUser(null);
      }
    } catch (error) {
      // Don't display an alert if fetching current user fails - e.g. this could occur when auth state refreshes
      // right after signing up but before the user is created in our MongoDB database through our backend
      console.log(`Error fetching current user: ${String(error)}`);
    } finally {
      setLoadingUser(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), (user: FirebaseAuthTypes.User | null) => {
      setLoadingUser(true);
      setFirebaseUser(user);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    void refreshMongoUser();
  }, [firebaseUser]);

  return (
    <UserContext.Provider
      value={{ loadingUser, firebaseUser, mongoUser, setMongoUser, refreshMongoUser }}
    >
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
