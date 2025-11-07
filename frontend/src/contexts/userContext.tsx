import { FirebaseAuthTypes, getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";

import { getMongoUser } from "@/lib/auth";
import { User } from "@/types";

type UserContext = {
  firebaseUser: FirebaseAuthTypes.User | null;
  mongoUser: User | null;
  isNewUser: boolean;
  refreshMongoUser: () => Promise<void>;
};

/**
 * A context that provides the current Firebase user data, null if not logged in
 */
export const UserContext = createContext<UserContext>({
  firebaseUser: null,
  mongoUser: null,
  isNewUser: false,
  refreshMongoUser: async () => {
    return Promise.resolve();
  },
});

/**
 * A provider component that handles the logic for supplying the context
 * with its current user
 */
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [firebaseUser, setFirebaseUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [mongoUser, setMongoUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

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
    const unsubscribe = onAuthStateChanged(getAuth(), (user) => {
      setFirebaseUser(user);
      if (user?.metadata?.creationTime && user?.metadata?.lastSignInTime) {
        setIsNewUser(user.metadata.creationTime === user.metadata.lastSignInTime);
      } else {
        setIsNewUser(false);
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);

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
    <UserContext.Provider value={{ firebaseUser, mongoUser, isNewUser, refreshMongoUser }}>
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
