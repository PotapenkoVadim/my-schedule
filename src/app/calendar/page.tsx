"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useOrderContext, useOrder, useSession } from "@/hooks";
import { ContextMenu, Spinner } from "@/components";
import { Calendar, OrderModal } from "@/libs";
import { useOrderStore } from "@/stores/order";
import { getContextMenuItems } from "@/utils";
import { OrderListEntity } from "@/interfaces";
import { PATHS } from "@/constants";
import styles from "./page.module.scss";

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [orderList] = useOrderStore(({ orderList }) => [orderList]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  const router = useRouter();
  const { theme } = useAppContext();
  const { isSessionLoading } = useSession();

  const onSuccess = (response?: OrderListEntity) => {
    console.log("SUCCESS: ", response);
  };

  const onError = () => console.log("ERROR");

  const { isLoading } = useOrder({
    onSuccess,
    onError,
  });

  const { ctxDate, ctxRef, ctxOrder, handleContextMenu, resetContextState } =
    useOrderContext();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    resetContextState();
  };

  const handleClick = (id: number) => {
    // TODO: provide state to table
    console.log("ID: ", id);
    router.push(`/${PATHS.table}`);
  };

  const handleAdd = () => {
    resetContextState();
    openModal();
  };

  const handleEdit = () => openModal();
  const handleDone = () => console.log("CTX DONE");
  const handleDelete = () => console.log("CTX DELETE");
  const handleReady = () => console.log("CTX READY");

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
            handleAdd,
            handleEdit,
            handleDone,
            handleDelete,
            handleReady,
          )}
        />
        <OrderModal
          isOpen={isOpenModal}
          ctxDate={ctxDate}
          order={ctxOrder}
          onClose={closeModal}
          isLoading={isLoading}
          onSubmit={(data) => console.log("SUBMIT: ", data)}
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
