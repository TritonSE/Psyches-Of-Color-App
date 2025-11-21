"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../lib/firebase";
import { verifyAdmin } from "../lib/api";

// DEV ONLY: Set to true to bypass authentication during development
const DEV_BYPASS_AUTH = process.env.NEXT_PUBLIC_DEV_BYPASS_AUTH === "true";

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

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

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        // Check if user is admin
        const adminStatus = await verifyAdmin(user.uid);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // DEV ONLY: Bypass authentication
    if (DEV_BYPASS_AUTH) {
      console.warn("⚠️  DEV MODE: Login bypassed!");
      return;
    }

    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const adminStatus = await verifyAdmin(userCredential.user.uid);

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

