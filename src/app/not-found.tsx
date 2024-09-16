"use client";

import { useRouter } from "next/navigation";
import { ShapesBackground, Button, Spinner } from "@/components";
import { useAppContext } from "@/context";
import { CURRENT_YEAR, PATHS } from "@/constants";
import { useListenSystemTray, useSession } from "@/hooks";
import { getToken } from "@/utils";
import { useEffect } from "react";
import styles from "./page.module.scss";

export default function NotFound() {
  const router = useRouter();
  const { theme, switchTheme } = useAppContext();
  const { currentUser, isSessionLoading, getSession } = useSession();

  useEffect(() => {
    const token = getToken();

    if (!currentUser && token) {
      getSession(CURRENT_YEAR);
    }
  }, [currentUser]);

  const moveToHove = () => router.push(PATHS.home);

  useListenSystemTray({ onSwitchTheme: switchTheme });

  let content;
  if (isSessionLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <ShapesBackground />

        <div className={styles.page__content}>
          <h1>Такая страница не найдена.</h1>
          <Button onClick={moveToHove} size="large">
            Вернуться на главную
          </Button>
        </div>
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
