import { PropsWithChildren, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { OrderContext } from "./OrderContext";
import { useCreateOrder, useDeleteOrder, useGetOrders, useUpdateOrder } from "@/hooks";
import { OrderModal } from "@/libs";
import { ContextMenu, ContextMenuProps } from "@/components";
import { findState, getContextMenuItems } from "@/utils";
import { OrderFormType, OrderType } from "@/types";
import { formatDeadlineToServer, transformDetails } from "@/App/utils";
import { useAppContext } from "../AppContext/AppContext";
import { DEFAULT_ERROR_MESSAGE } from "@/constants";

export default function OrderProvider({
  children,
  year
}: PropsWithChildren<{
  year: number
}>) {
  const ctxRef = useRef<ContextMenu & Readonly<ContextMenuProps>>(null);
  const {showToast} = useAppContext();

  const {orders, isLoadingOrders, isErrorOrders, handleGetOrders, resetOrdersState} = useGetOrders();
  const {handleCreateOrder, isErrorCreateOrder, isLoadingCreateOrder, resetCreateOrderState} = useCreateOrder();
  const {handleUpdateOrder, isErrorUpdateOrder, isLoadingUpdateOrder, resetUpdateOrderState} = useUpdateOrder();
  const {handleDeleteOrder, isErrorDeleteOrder, isLoadingDeleteOrder, resetDeleteOrderState} = useDeleteOrder();

  const loading = findState([isLoadingCreateOrder, isLoadingOrders, isLoadingUpdateOrder, isLoadingDeleteOrder]);
  const error = findState([isErrorOrders, isErrorCreateOrder, isErrorUpdateOrder, isErrorDeleteOrder]);

  const [ctxOrder, setCtxOrder] = useState<OrderType>();
  const [ctxDate, setCtxDate] = useState<Date>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const resetErrors = () => {
    resetOrdersState();
    resetCreateOrderState();
    resetUpdateOrderState();
    resetDeleteOrderState();
  };

  const setCtxData = useCallback(({order, date}: {order?: OrderType, date?: Date | null}) => {
    setCtxOrder(order);

    if (date) {
      setCtxDate(date);
    }
  }, []);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => {
    setIsOpenModal(false);
    setCtxOrder(undefined);
  };

  const handleCtxAdd = () => {
    setCtxOrder(undefined);
    openModal();
  };

  const handleCtxEdit = () => openModal();
  const handleCtxDone = async () => {
    if (ctxOrder) {
      const newOrder = JSON.stringify({
        ...ctxOrder,
        done: !ctxOrder.done,
        ready: true
      });

      await handleUpdateOrder({
        orderId: ctxOrder.id!,
        updatedOrder: newOrder,
      });

      await handleGetOrders({year});
    }

    closeModal();
  };

  const handleCtxDelete = async () => {
    if (ctxOrder) {
      await handleDeleteOrder({orderId: ctxOrder.id!});
      await handleGetOrders({year});
    }

    closeModal();
  };

  const handleCtxReady = async () => {
    if (ctxOrder) {
      const newOrder = JSON.stringify({
        ...ctxOrder,
        ready: !ctxOrder.ready
      });

      await handleUpdateOrder({
        orderId: ctxOrder.id!,
        updatedOrder: newOrder,
      });

      await handleGetOrders({year});
    }

    closeModal();
  };

  const handleSubmit = async (data: OrderFormType) => {
    const deadline = formatDeadlineToServer(data.deadline);
    const details = transformDetails(data.details);
    const newOrder = JSON.stringify({
      ...data,
      id: data.id || uuidv4(),
      done: data.done || false,
      ready: data.ready || false,
      deadline: deadline || [],
      details
    });

    if (ctxOrder) {
      await handleUpdateOrder({orderId: ctxOrder.id!, updatedOrder: newOrder});
    } else {
      await handleCreateOrder({order: newOrder});
    }
    
    await handleGetOrders({year});
    closeModal();
  };

  useEffect(() => {
    if (error) {
      showToast("error", DEFAULT_ERROR_MESSAGE);
      resetErrors();
    }
  }, [error]);

  useEffect(() => {
    if (year) {
      handleGetOrders({year});
    }
  }, [year, handleGetOrders]);

  const value = useMemo(() => {
    return {
      orders,
      loading,
      ctxRef,
      setCtxData,
      handleGetOrders
    };
  }, [orders, loading, ctxRef, setCtxData, handleGetOrders]);

  return (
    <OrderContext.Provider value={value}>
      {children}

      <OrderModal
        isOpen={isOpenModal}
        order={ctxOrder}
        isLoading={loading}
        onClose={closeModal}
        onSubmit={handleSubmit}
        ctxDate={ctxDate}
      />

      <ContextMenu
        model={getContextMenuItems(
          handleCtxAdd,
          handleCtxEdit,
          handleCtxDone,
          handleCtxDelete,
          handleCtxReady
        )}
        ref={ctxRef}
      />
    </OrderContext.Provider>
  );
};