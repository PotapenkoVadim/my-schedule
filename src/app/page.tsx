"use client";

import { useRouter } from "next/navigation";
import { APP_TITLE, APP_DESCRIPTION, CURRENT_YEAR } from "@/constants";
import { useAppContext } from "@/context";
import { Button, Spinner, ShapesBackground } from "@/components";
import { useListenSystemTray, useSession } from "@/hooks";
import { getInitialPath, getToken } from "@/utils";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const { theme, switchTheme } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, isSessionLoading, getSession } = useSession();

  const moveTo = () => {
    router.push(getInitialPath(currentUser));
  };

  useEffect(() => {
    const token = getToken();
    if (!currentUser && token) {
      getSession(CURRENT_YEAR);
    }

    setIsLoading(false);
  }, [currentUser]);

  useListenSystemTray({ onSwitchTheme: switchTheme });

  let content;
  if (isSessionLoading || isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <ShapesBackground />
        <div className={styles.page__content}>
          <h1 className={styles.page__title}>{APP_TITLE}</h1>
          <div>{APP_DESCRIPTION}</div>
          <Button onClick={moveTo} size="large">
            Начать
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
