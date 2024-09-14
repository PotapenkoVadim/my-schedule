"use client";

import { useAppContext } from "@/context";
import { Gallery, UserGenerator } from "@/libs";
import { PageContent, Spinner } from "@/components";
import { ABOUT_PAGE_IMAGES, CURRENT_YEAR } from "@/constants";
import { useSession } from "@/hooks";
import { useEffect } from "react";
import { getToken } from "@/utils";
import styles from "./page.module.scss";

export default function AboutPage() {
  const { theme } = useAppContext();
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
      <PageContent>
        <h1 className={styles.page__title}>My Schedule</h1>

        <div className={styles.page__text}>
          Приложение предназначено для учета и визуализации заказов. Оно
          позволяет пользователям просматривать информацию о заказах в двух
          форматах: в виде цветовых схем на календаре и в виде таблицы. Каждый
          заказ имеет свой цвет, который выбирает пользователь, и статус,
          который может меняться со временем. Статус заказа отображается на
          календаре различными способами в зависимости от его текущего
          состояния.
        </div>
        <div className={styles.page__text}>
          Приложение также поддерживает ролевую модель с тремя уровнями доступа:
          администратор, пользователь и временный пользователь. Администратор
          имеет возможность добавлять новых пользователей. Пользователи и
          временные пользователи имеют доступ к основным функциям приложения, но
          доступ временных пользователей к приложению ограничен сутками.
        </div>

        <UserGenerator className={styles.page__generator} />
        <Gallery className={styles.page__gallery} images={ABOUT_PAGE_IMAGES} />
      </PageContent>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
