"use client";

import classnames from "classnames";
import { APP_TITLE, APP_DESCRIPTION } from "@/constants";
import { useAppContext } from "@/context";
import { Button } from "@/components";
import styles from "./page.module.scss";

export default function Home() {
  const { theme } = useAppContext();

  const shapeOneStyles = classnames(styles.page__shape, styles.page__shape_one);
  const shapeTwoStyles = classnames(styles.page__shape, styles.page__shape_two);
  const shapeThreeStyles = classnames(
    styles.page__shape,
    styles.page__shape_three,
  );

  return (
    <main data-theme={theme} className={classnames(styles.page)}>
      <div className={styles.page__container}>
        <div className={shapeOneStyles} />
        <div className={shapeTwoStyles} />
        <div className={shapeThreeStyles} />
      </div>

      <div className={styles.page__content}>
        <h1 className={styles.page__title}>{APP_TITLE}</h1>
        <div>{APP_DESCRIPTION}</div>
        <Button size="large">Начать</Button>
      </div>
    </main>
  );
}
