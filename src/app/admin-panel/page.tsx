"use client";

import { useAppContext } from "@/context";
import styles from "./page.module.scss";

export default function AdminPanel() {
  const { theme } = useAppContext();

  return (
    <main data-theme={theme} className={styles.page}>
      Admin Panel
    </main>
  );
}
