"use client";

import { MouseEvent, useRef, useState } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useSession } from "@/hooks";
import { ContextMenu, ContextMenuProps, Spinner } from "@/components";
import { Calendar } from "@/libs";
import { useOrderStore } from "@/stores/order";
import { getContextMenuItems } from "@/utils";
import { OrderEntity } from "@/interfaces";
import { PATHS } from "@/constants";
import styles from "./page.module.scss";

export default function CalendarPage() {
  const ctxRef = useRef<ContextMenu & Readonly<ContextMenuProps>>(null);

  const router = useRouter();
  const { theme } = useAppContext();
  const { isSessionLoading } = useSession();

  const [year, setYear] = useState(new Date().getFullYear());
  const [orderList] = useOrderStore(({ orderList }) => [orderList]);
  const [ctxOrder, setCtxOrder] = useState<OrderEntity>();
  const [ctxDate, setCtxDate] = useState<Date>();

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement>,
    order?: OrderEntity,
    date?: Date | null,
  ) => {
    if (ctxRef.current) {
      ctxRef.current.show(e);

      setCtxOrder(order);
      if (date) {
        setCtxDate(date);
      }
    }
  };

  const handleClick = (id: number) => {
    console.log("ID: ", id);
    router.push(`/${PATHS.table}`);
  };

  const handleCtxAdd = () => console.log("CTX ADD");
  const handleCtxEdit = () => console.log("CTX EDIT");
  const handleCtxDone = () => console.log("CTX DONE");
  const handleCtxDelete = () => console.log("CTX DELETE");
  const handleCtxReady = () => console.log("CTX READY");

  console.log("CTX ORDER: ", ctxOrder);
  console.log("CTX DATE: ", ctxDate);

  let content;
  if (isSessionLoading) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <Calendar
          theme={theme}
          year={year}
          onChangeYear={setYear}
          onClickCtxMenu={handleContextMenu}
          orders={orderList?.items || []}
          onClick={handleClick}
        />
        <ContextMenu
          ref={ctxRef}
          data-theme={theme}
          model={getContextMenuItems(
            handleCtxAdd,
            handleCtxEdit,
            handleCtxDone,
            handleCtxDelete,
            handleCtxReady,
          )}
        />
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
