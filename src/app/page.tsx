"use client";

import classnames from "classnames";
import { APP_TITLE, APP_DESCRIPTION } from "@/constants";
import { useAppContext } from "@/context";
import { Button, ShapesBackground } from "@/components";
import styles from "./page.module.scss";

export default function Home() {
  const { theme } = useAppContext();

  return (
    <main data-theme={theme} className={classnames(styles.page)}>
      <ShapesBackground />

      <div className={styles.page__content}>
        <h1 className={styles.page__title}>{APP_TITLE}</h1>
        <div>{APP_DESCRIPTION}</div>
        <Button size="large">Начать</Button>
      </div>
    </main>
  );
}
