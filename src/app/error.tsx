"use client";

import { useAppContext } from "@/context";
import { ShapesBackground, Button } from "@/components";
import styles from "./page.module.scss";

export default function Error({ reset }: { reset: () => void }) {
  const { theme } = useAppContext();

  return (
    <main data-theme={theme} className={styles.page}>
      <ShapesBackground />

      <div className={styles.page__content}>
        <h1>Ой, что-то пошло не так!</h1>
        <Button size="large" onClick={reset}>
          Повторить запрос
        </Button>
      </div>
    </main>
  );
}
