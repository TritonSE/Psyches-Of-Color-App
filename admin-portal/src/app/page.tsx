import Image from "next/image";

import styles from "./page.module.css";

export default function AdminHome() {
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
          <button className={styles.navButton}>
            <Image src="/statistics.svg" alt="Statistics" width={20} height={20} />
            <span>Statistics</span>
          </button>
          <button className={styles.navButton}>
            <Image src="/editor.svg" alt="Editor" width={20} height={20} />
            <span>Editor</span>
          </button>
          <button className={styles.navButton}>
            <Image src="/user-settings.svg" alt="User Settings" width={20} height={20} />
            <span>User Settings</span>
          </button>
        </nav>
      </aside>

      <main className={styles.main}>
      </main>
    </div>
  );
}
