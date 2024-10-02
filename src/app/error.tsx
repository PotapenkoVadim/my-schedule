"use client";

import { ShapesBackground, Button, Spinner } from "@/components";
import { useSession } from "@/hooks";
import { getToken } from "@/utils";
import { useEffect } from "react";
import { CURRENT_YEAR } from "@/constants";
import styles from "./page.module.scss";

export default function Error({ reset }: { reset: () => void }) {
  const { currentUser, isSessionLoading, getSession } = useSession();

  useEffect(() => {
    const token = getToken();

    if (!currentUser && token) {
      getSession(CURRENT_YEAR);
    }
  }, [currentUser]);

  let content;
  if (isSessionLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <ShapesBackground />

        <div className={styles.page__content}>
          <h1>Ой, что-то пошло не так!</h1>
          <Button size="large" onClick={reset}>
            Повторить запрос
          </Button>
        </div>
      </>
    );
  }

  return <div className={styles.page}>{content}</div>;
}
