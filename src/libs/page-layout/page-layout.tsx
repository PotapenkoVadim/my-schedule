"use client";

import { PropsWithChildren } from "react";
import { useAppContext } from "@/context";
import { useListenThemeTray } from "@/hooks";
import { Sidebar } from "../sidebar/sidebar";
import { Footer, Header } from "./components";
import styles from "./page-layout.module.scss";

export function PageLayout({ children }: PropsWithChildren<{}>) {
  const { theme, switchTheme } = useAppContext();

  useListenThemeTray(switchTheme);

  return (
    <main data-theme={theme} className={styles.page}>
      <Header theme={theme} />
      {children}
      <Footer theme={theme} />
      <Sidebar />
    </main>
  );
}
