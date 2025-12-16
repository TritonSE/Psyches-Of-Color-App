"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuth } from "../../contexts/AuthContext";

import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      router.push("/login");
    }
  }, [user, isAdmin, loading, router]);

  if (loading || !user || !isAdmin) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          fontSize: "18px",
          color: "#6c6c6c",
        }}
      >
        Loading...
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.logoWrapper}>
          <Image src="/poc-logo-white.png" alt="Psyches of Color Logo" width={180} height={21} />
        </div>

        <nav className={styles.navWrapper}>
          <a href="/dashboard/statistics" className={styles.navLink}>
            <button
              className={`${styles.navButton} ${pathname === "/dashboard/statistics" ? styles.active : ""}`}
            >
              <Image src="/statistics.svg" alt="Statistics" width={20} height={20} />
              <span>Statistics</span>
            </button>
          </a>

          <a href="/dashboard/editor" className={styles.navLink}>
            <button
              className={`${styles.navButton} ${pathname === "/dashboard/editor" ? styles.active : ""}`}
            >
              <Image src="/editor.svg" alt="Editor" width={20} height={20} />
              <span>Content Editor</span>
            </button>
          </a>
        </nav>

        <p>Logged in as {user.displayName}</p>

        <button
          className={styles.logoutButton}
          onClick={() => {
            void handleLogout();
          }}
        >
          Log Out
        </button>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
