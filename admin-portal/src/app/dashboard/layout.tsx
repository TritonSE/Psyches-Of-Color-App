"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import styles from "./dashboard.module.css";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin, loading, logout } = useAuth();
  const router = useRouter();

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
          <Image
            src="/Primary-Liberation.svg"
            alt="Psyches of Color Logo"
            width={163}
            height={59}
          />
        </div>

        <nav className={styles.navWrapper}>
          <button className={`${styles.navButton} ${styles.active}`}>
            <Image src="/statistics.svg" alt="Statistics" width={20} height={20} />
            <span>Statistics</span>
          </button>
          <button className={styles.navButton} disabled>
            <Image src="/editor.svg" alt="Editor" width={20} height={20} />
            <span>Editor</span>
          </button>
          <button className={styles.navButton} disabled>
            <Image src="/user-settings.svg" alt="User Settings" width={20} height={20} />
            <span>User Settings</span>
          </button>
        </nav>

        <button className={styles.logoutButton} onClick={handleLogout}>
          Log Out
        </button>
      </aside>

      <main className={styles.main}>{children}</main>
    </div>
  );
}
