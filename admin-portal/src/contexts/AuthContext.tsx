"use client";

import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";

import { verifyAdmin } from "../lib/api";
import { auth } from "../lib/firebase";

// DEV ONLY: Set to true to bypass authentication during development
const DEV_BYPASS_AUTH = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // DEV ONLY: Bypass authentication
    if (DEV_BYPASS_AUTH) {
      console.warn("⚠️  DEV MODE: Authentication bypassed!");
      setUser({ uid: "dev-user" } as User);
      setIsAdmin(true);
      setLoading(false);
      return;
    }

    const onUserUpdated = async (newUser: User | null) => {
      setUser(newUser);

      if (newUser) {
        // Check if user is admin
        const token = await newUser.getIdToken();
        const adminStatus = await verifyAdmin(token);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    };

    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      void onUserUpdated(newUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    // DEV ONLY: Bypass authentication
    if (DEV_BYPASS_AUTH) {
      console.warn("⚠️  DEV MODE: Login bypassed!");
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    const adminStatus = await verifyAdmin(token);

    if (!adminStatus) {
      await signOut(auth);
      throw new Error("Access denied. Admin privileges required.");
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
