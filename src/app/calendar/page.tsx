"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { useSession } from "@/hooks";
import { Spinner } from "@/components";
import { Calendar } from "@/libs";
import { useOrderStore } from "@/stores/order";
import styles from "./page.module.scss";

export default function CalendarPage() {
  const { theme } = useAppContext();
  const { isSessionLoading } = useSession();

  const [year, setYear] = useState(new Date().getFullYear());
  const [orderList] = useOrderStore(({ orderList }) => [orderList]);

  const handleContextMenu = () => console.log("context");
  const handleClick = (id: number) => console.log("id: ", id);

  let content;
  if (isSessionLoading) {
    content = <Spinner isPage />;
  } else {
    content = (
      <Calendar
        theme={theme}
        year={year}
        onChangeYear={setYear}
        onClickCtxMenu={handleContextMenu}
        orders={orderList?.items || []}
        onClick={handleClick}
      />
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
