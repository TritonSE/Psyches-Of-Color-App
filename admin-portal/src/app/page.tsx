"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../contexts/AuthContext";

export default function Home() {
  const router = useRouter();
  const { user, isAdmin, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user && isAdmin) {
        router.push("/dashboard");
      } else {
        router.push("/login");
      }
    }
  }, [user, isAdmin, loading, router]);

  return (
    <div style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "100vh",
      fontSize: "18px",
      color: "#6c6c6c"
    }}>
      Loading...
    </div>
  );
}
