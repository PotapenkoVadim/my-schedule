"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useOrderMenuCtx, useOrder, useSession } from "@/hooks";
import { ContextMenu, Spinner } from "@/components";
import { Calendar, OrderModal } from "@/libs";
import { useOrderStore } from "@/stores/order";
import {
  formatDeadlineToServer,
  getContextMenuItems,
  transformDetails,
} from "@/utils";
import { OrderListEntity } from "@/interfaces";
import { PATHS, WENT_WRONG_ERROR } from "@/constants";
import { OrderFormType, OrderStatus } from "@/types";
import styles from "./page.module.scss";

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [orderList, setOrderList] = useOrderStore(
    ({ orderList, setOrderList }) => [orderList, setOrderList],
  );

  const router = useRouter();
  const { theme, showToast } = useAppContext();
  const { isSessionLoading, isSessionError, isSessionSuccess } = useSession();
  const { ctxDate, ctxRef, ctxOrder, handleContextMenu, resetContextState } =
    useOrderMenuCtx();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    resetContextState();
  };

  const onSuccess = (response?: OrderListEntity) => {
    setOrderList(response || null);
    closeModal();
  };

  const onError = () => {
    showToast("error", WENT_WRONG_ERROR);
    closeModal();
  };

  const { addOrder, editOrder, isLoading } = useOrder({
    onSuccess,
    onError,
  });

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

  const onSubmit = (data: OrderFormType) => {
    const order = {
      ...data,
      status: OrderStatus[0],
      deadline: formatDeadlineToServer(data.deadline),
      details: transformDetails(data.details),
    };

    if (ctxOrder) {
      editOrder(ctxOrder.id, { ...order, status: ctxOrder.status });
    } else {
      addOrder(order);
    }
  };

  let content;
  if (isSessionLoading || (!isSessionSuccess && !isSessionError)) {
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
          isLoading={isLoading}
          onClose={closeModal}
          onSubmit={onSubmit}
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
