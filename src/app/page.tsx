"use client";

import classnames from "classnames";
import { useRouter } from "next/navigation";
import { APP_TITLE, APP_DESCRIPTION, PATHS } from "@/constants";
import { useAppContext } from "@/context";
import { Button, Spinner, ShapesBackground } from "@/components";
import { useSession } from "@/hooks";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const { theme } = useAppContext();
  const { currentUser, isSessionLoading, isSessionError } = useSession();

  const moveTo = () => {
    router.push(!currentUser ? PATHS.signIn : PATHS.calendar);
  };

  let content;
  if (isSessionLoading || (!currentUser && !isSessionError)) {
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
    <main data-theme={theme} className={classnames(styles.page)}>
      {content}
    </main>
  );
}
