"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import omit from "lodash/omit";
import { useRouter } from "next/navigation";
import {
  useOrderMenuCtx,
  useOrder,
  useSession,
  useListenSystemTray,
} from "@/hooks";
import { ContextMenu, DialogModal, PageContent, Spinner } from "@/components";
import { Calendar, OrderModal } from "@/libs";
import {
  constructOrder,
  getContextMenuItems,
  handleDoneStatus,
  handleReadyStatus,
} from "@/utils";
import { DIALOG_ACTION_TITLES, PATHS, WENT_WRONG_ERROR } from "@/constants";
import { DialogVariant, OrderFormType, OrderStatus } from "@/types";
import { useSelectedYearStore } from "@/stores";
import { withPrivateRoute } from "@/hoc";
import styles from "./page.module.scss";

function CalendarPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dialogModal, setDialogModal] = useState<DialogVariant>();

  const [selectedYear, changeYear] = useSelectedYearStore(
    ({ selectedYear, changeYear }) => [selectedYear, changeYear],
  );

  const router = useRouter();
  const { theme, showToast, switchTheme } = useAppContext();
  const { currentUser, isSessionLoading, isSessionError } = useSession();

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

  const onSuccess = () => {
    closeModal();
    closeDialogModal();
  };

  const onError = () => {
    showToast("error", WENT_WRONG_ERROR);
    closeModal();
    closeDialogModal();
  };

  const {
    orderList,
    addOrder,
    getOrders,
    editOrder,
    deleteOrder,
    isLoading,
    isGetOrdersLoading,
  } = useOrder({ onSuccess, onError });

  const handleClick = (id?: number) => {
    router.push(id ? `${PATHS.table}?id=${id}` : PATHS.table);
  };

  const handleAdd = () => {
    resetContextState();
    openModal();
  };

  const handleEdit = () => openModal();
  const handleDone = () => {
    if (!ctxOrder) return;

    const variant =
      ctxOrder.status === OrderStatus.Done
        ? DialogVariant.cancelDone
        : DialogVariant.done;

    setDialogModal(variant);
  };

  const handleDelete = () => {
    if (ctxOrder) setDialogModal(DialogVariant.delete);
  };

  const handleReady = () => {
    if (!ctxOrder) return;

    const variant =
      ctxOrder.status === OrderStatus.Ready
        ? DialogVariant.cancelReady
        : DialogVariant.ready;

    setDialogModal(variant);
  };

  const onSubmitOrderForm = (data: OrderFormType) => {
    const order = constructOrder(data, selectedYear);

    if (ctxOrder) {
      editOrder(ctxOrder.id, { ...order, status: ctxOrder.status });
    } else {
      addOrder(order);
    }
  };

  const handleDeleteOrder = () => {
    if (ctxOrder?.id) {
      deleteOrder(ctxOrder.id, selectedYear);
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

  const switchDoneStatus = () => handleStatusOrder(handleDoneStatus(ctxOrder));
  const switchReadyStatus = () =>
    handleStatusOrder(handleReadyStatus(ctxOrder));
  const handleChangeYear = async (year: number) => {
    if (currentUser?.orders?.id) {
      await getOrders(currentUser.orders.id, year);
      changeYear(year);
    }
  };

  useListenSystemTray({ onAddOrder: handleAdd, onSwitchTheme: switchTheme });

  const isLoadingPage =
    isSessionLoading || isGetOrdersLoading || (!currentUser && !isSessionError);

  const dialogModalActions = {
    [DialogVariant.delete]: handleDeleteOrder,
    [DialogVariant.done]: switchDoneStatus,
    [DialogVariant.ready]: switchReadyStatus,
    [DialogVariant.cancelDone]: switchDoneStatus,
    [DialogVariant.cancelReady]: switchReadyStatus,
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
          user={currentUser}
          orders={orderList?.items || []}
          onChangeYear={handleChangeYear}
          onClickCtxMenu={handleContextMenu}
          onClick={handleClick}
          onAddOrder={handleAdd}
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
      <PageContent>{content}</PageContent>
    </main>
  );
}

export default withPrivateRoute(CalendarPage, "onlyUser");
