"use client";

import Image from "next/image";
import { useAppContext } from "@/context";
import { UserGenerator } from "@/libs";
import adminImage from "@/assets/images/admin.png";
import calendarImage from "@/assets/images/calendar.png";
import tableImage from "@/assets/images/table.png";
import { PageContent } from "@/components";
import styles from "./page.module.scss";

export default function AboutPage() {
  const { theme } = useAppContext();

  const images = [
    { src: calendarImage, alt: "страница календаря" },
    { src: tableImage, alt: "страница таблицы" },
    { src: adminImage, alt: "страница админки" },
  ];

  return (
    <main data-theme={theme} className={styles.page}>
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
        {images.map(({ src, alt }) => (
          <Image
            key={alt}
            className={styles.page__image}
            width={0}
            height={0}
            sizes="100vw"
            src={src}
            alt={alt}
          />
        ))}
      </PageContent>
    </main>
  );
}
