"use client";

import { useEffect, useState } from "react";
import { PageContent, ShapesBackground, Spinner } from "@/components";
import { ABOUT_PAGE_IMAGES, APP_TITLE, CURRENT_YEAR } from "@/constants";
import { useAppContext } from "@/context";
import { useListenSystemTray, useSession } from "@/hooks";
import { getToken } from "@/utils";
import { Gallery, UserGenerator } from "@/libs";
import styles from "./page.module.scss";

export default function AboutPage() {
  const { theme, switchTheme } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser, isSessionLoading, getSession } = useSession();

  useEffect(() => {
    const token = getToken();
    if (!currentUser && token) {
      getSession(CURRENT_YEAR);
    }

    setIsLoading(false);
  }, [currentUser]);

  useListenSystemTray({ onSwitchTheme: switchTheme });

  let content;
  if (isSessionLoading || isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <ShapesBackground />

        <PageContent>
          <div className={styles.page__content}>
            <div>
              <h1 className={styles.page__title}>{APP_TITLE} App.</h1>

              <div className={styles.page__description}>
                Приложение предназначено для учета и визуализации заказов. Оно
                позволяет пользователям просматривать информацию о заказах в
                двух форматах: в виде цветовых схем на календаре и в виде
                таблицы. Каждый заказ имеет свой цвет, который выбирает
                пользователь, и статус, который может меняться со временем.
                Статус заказа отображается на календаре различными способами в
                зависимости от его текущего состояния.
              </div>

              <div className={styles.page__subdescription}>
                Приложение также поддерживает ролевую модель с тремя уровнями
                доступа: администратор, пользователь и временный пользователь.
                Администратор имеет возможность добавлять новых пользователей.
                Пользователи и временные пользователи имеют доступ к основным
                функциям приложения, но доступ временных пользователей к
                приложению ограничен сутками.
              </div>

              <UserGenerator className={styles.page__generator} />
            </div>

            <div className={styles.page__wrapper}>
              <Gallery
                theme={theme}
                className={styles.page__gallery}
                images={ABOUT_PAGE_IMAGES}
              />
            </div>
          </div>
        </PageContent>
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
