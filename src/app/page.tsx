"use client";

import { useRouter } from "next/navigation";
import { APP_TITLE, APP_DESCRIPTION, CURRENT_YEAR } from "@/constants";
import { Button, Spinner, ShapesBackground } from "@/components";
import { useSession } from "@/hooks";
import { getInitialPath, getToken } from "@/utils";
import { useEffect, useState } from "react";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
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

  return <div className={styles.page}>{content}</div>;
}
