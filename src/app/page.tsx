"use client";

import classnames from "classnames";
import { APP_TITLE } from "@/constants";
import { useAppContext } from "@/context";
import styles from "./page.module.scss";

export default function Home() {
  const { theme } = useAppContext();

  return (
    <main data-theme={theme} className={classnames(styles.page)}>
      <div className={styles.page__container}>
        <div
          className={classnames(styles.page__shape, styles.page__shape_one)}
        />
        <div
          className={classnames(styles.page__shape, styles.page__shape_two)}
        />
        <div
          className={classnames(styles.page__shape, styles.page__shape_three)}
        />
      </div>

      <h1 className={styles.page__title}>{APP_TITLE}</h1>
    </main>
  );
}
