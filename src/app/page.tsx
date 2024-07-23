"use client";

import classnames from "classnames";
import { useRouter } from "next/navigation";
import { APP_TITLE, APP_DESCRIPTION, PATHS } from "@/constants";
import { useAppContext } from "@/context";
import { Button, ShapesBackground } from "@/components";
import { useUserStore } from "@/stores/user";
import styles from "./page.module.scss";

export default function Home() {
  const router = useRouter();
  const { theme } = useAppContext();
  const [user] = useUserStore(({ user }) => [user]);

  const moveTo = () => {
    router.push(!user ? PATHS.signIn : PATHS.calendar);
  };

  return (
    <main data-theme={theme} className={classnames(styles.page)}>
      <ShapesBackground />

      <div className={styles.page__content}>
        <h1 className={styles.page__title}>{APP_TITLE}</h1>
        <div>{APP_DESCRIPTION}</div>
        <Button onClick={moveTo} size="large">
          Начать
        </Button>
      </div>
    </main>
  );
}
