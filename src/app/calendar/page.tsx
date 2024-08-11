"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import omit from "lodash/omit";
import { useRouter } from "next/navigation";
import { useOrderMenuCtx, useOrder, useSession } from "@/hooks";
import { ContextMenu, DialogModal, Spinner } from "@/components";
import { Calendar, OrderModal } from "@/libs";
import { useOrderStore } from "@/stores/order";
import {
  getContextMenuItems,
  handleDoneStatus,
  handleReadyStatus,
} from "@/utils";
import { OrderListEntity } from "@/interfaces";
import { DIALOG_ACTION_TITLES, PATHS, WENT_WRONG_ERROR } from "@/constants";
import { OrderFormType, OrderStatus } from "@/types";
import { useUserStore } from "@/stores/user";
import styles from "./page.module.scss";

export default function CalendarPage() {
  const [year, setYear] = useState(new Date().getFullYear());
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dialogModal, setDialogModal] = useState<"delete" | "ready" | "done">();

  const [user] = useUserStore(({ user }) => [user]);
  const [orderList, setOrderList] = useOrderStore(
    ({ orderList, setOrderList }) => [orderList, setOrderList],
  );

  const router = useRouter();
  const { theme, showToast } = useAppContext();
  const { isSessionLoading, isSessionError } = useSession();
  const { ctxDate, ctxRef, ctxOrder, handleContextMenu, resetContextState } =
    useOrderMenuCtx();

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    resetContextState();
  };

  const closeDialogModal = () => {
    setDialogModal(undefined);
    resetContextState();
  };

  const onSuccess = (response?: OrderListEntity) => {
    setOrderList(response || null);
    closeModal();
    closeDialogModal();
  };

  const onError = () => {
    showToast("error", WENT_WRONG_ERROR);
    closeModal();
    closeDialogModal();
  };

  const { addOrder, editOrder, deleteOrder, isLoading } = useOrder({
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
  const handleDone = () => setDialogModal("done");
  const handleDelete = () => setDialogModal("delete");
  const handleReady = () => setDialogModal("ready");

  const onSubmitOrderForm = (data: OrderFormType) => {
    const order = {
      ...data,
      status: OrderStatus.InProgress,
      currentYear: year,
    };

    if (ctxOrder) {
      editOrder(ctxOrder.id, { ...order, status: ctxOrder.status });
    } else {
      addOrder(order);
    }
  };

  const handleDeleteOrder = () => {
    if (ctxOrder?.id) {
      deleteOrder(ctxOrder?.id, year);
    }
  };

  const handleStatusOrder = (status: string) => {
    if (ctxOrder) {
      editOrder(ctxOrder.id, {
        ...omit(ctxOrder, ["id", "orderListId"]),
        status,
        currentYear: year,
      });
    }
  };

  const dialogModalActions = {
    delete: handleDeleteOrder,
    done: () => handleStatusOrder(handleDoneStatus(ctxOrder)),
    ready: () => handleStatusOrder(handleReadyStatus(ctxOrder)),
  };

  let content;
  if (isSessionLoading || (!user && !isSessionError)) {
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
          onSubmit={onSubmitOrderForm}
        />

        <DialogModal
          isOpen={Boolean(dialogModal)}
          isLoading={isLoading}
          onClose={closeDialogModal}
          title={dialogModal ? DIALOG_ACTION_TITLES[dialogModal] : undefined}
          onSuccess={dialogModal ? dialogModalActions[dialogModal] : undefined}
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
