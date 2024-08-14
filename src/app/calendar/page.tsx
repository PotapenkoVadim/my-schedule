"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import omit from "lodash/omit";
import { useRouter } from "next/navigation";
import { useOrderMenuCtx, useOrder, useSession, useFetch } from "@/hooks";
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
import { DialogVariant, OrderFormType, OrderStatus } from "@/types";
import { useUserStore } from "@/stores/user";
import { getOrdersService } from "@/services";
import styles from "./page.module.scss";

export default function CalendarPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dialogModal, setDialogModal] = useState<DialogVariant>();

  const [user, selectedYear, changeYear] = useUserStore(
    ({ user, selectedYear, changeYear }) => [user, selectedYear, changeYear],
  );

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

  const { handleFetch: getOrders, isLoading: isGetOrdersLoading } = useFetch({
    queryFn: getOrdersService,
    onSuccess,
    onError,
  });

  const handleClick = (id: number) => {
    router.push(`${PATHS.table}?id=${id}`);
  };

  const handleAdd = () => {
    resetContextState();
    openModal();
  };

  const handleEdit = () => openModal();
  const handleDone = () => setDialogModal(DialogVariant.done);
  const handleDelete = () => setDialogModal(DialogVariant.delete);
  const handleReady = () => setDialogModal(DialogVariant.ready);

  const onSubmitOrderForm = (data: OrderFormType) => {
    const order = {
      ...data,
      status: OrderStatus.InProgress,
      currentYear: selectedYear,
    };

    if (ctxOrder) {
      editOrder(ctxOrder.id, { ...order, status: ctxOrder.status });
    } else {
      addOrder(order);
    }
  };

  const handleDeleteOrder = () => {
    if (ctxOrder?.id) {
      deleteOrder(ctxOrder?.id, selectedYear);
    }
  };

  const handleStatusOrder = (status: string) => {
    if (ctxOrder) {
      editOrder(ctxOrder.id, {
        ...omit(ctxOrder, ["id", "orderListId"]),
        status,
        currentYear: selectedYear,
      });
    }
  };

  const handleChangeYear = async (year: number) => {
    if (user?.orders?.id) {
      await getOrders(user.orders.id, year);
      changeYear(year);
    }
  };

  const isLoadingPage =
    isSessionLoading || isGetOrdersLoading || (!user && !isSessionError);

  const dialogModalActions = {
    [DialogVariant.delete]: handleDeleteOrder,
    [DialogVariant.done]: () => handleStatusOrder(handleDoneStatus(ctxOrder)),
    [DialogVariant.ready]: () => handleStatusOrder(handleReadyStatus(ctxOrder)),
  };

  let content;
  if (isLoadingPage) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <Calendar
          theme={theme}
          year={selectedYear}
          onChangeYear={handleChangeYear}
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
