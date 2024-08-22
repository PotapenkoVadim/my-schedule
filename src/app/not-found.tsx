"use client";

import { useRouter } from "next/navigation";
import { ShapesBackground, Button } from "@/components";
import { useAppContext } from "@/context";
import { PATHS } from "@/constants";
import styles from "./page.module.scss";

export default function NotFound() {
  const router = useRouter();
  const { theme } = useAppContext();

  const moveToHove = () => router.push(PATHS.home);

  return (
    <main data-theme={theme} className={styles.page}>
      <ShapesBackground />

      <div className={styles.page__content}>
        <h1>Такая страница не найдена.</h1>
        <Button onClick={moveToHove} size="large">
          Вернуться на главную
        </Button>
      </div>
    </main>
  );
}
