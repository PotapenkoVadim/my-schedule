import { MouseEvent, useEffect, useRef, useState } from "react";
import {v4 as uuidv4} from "uuid";
import { useAppContext } from "@/App/context/AppContext";
import { ContextMenu, PageContent, SpinnerBlock, ContextMenuProps } from "@/components";
import { Calendar, OrderModal } from "@/libs";
import { useCreateOrder, useDeleteOrder, useGetOrders, useUpdateOrder } from "@/hooks";
import { DEFAULT_ERROR_MESSAGE, RouterMap, currentYear } from "@/constants";
import { OrderFormType, OrderType } from "@/types";
import { formatDeadlineToServer, getContextMenuItems, transformDetails } from "./utils";
import { findState } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function CalendarPage() {
  const navigate = useNavigate();
  const ctxRef = useRef<ContextMenu & Readonly<ContextMenuProps>>(null);
  const {theme, showToast} = useAppContext();

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [ctxOrder, setCtxOrder] = useState<OrderType>();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {orders, isLoadingOrders, isErrorOrders, handleGetOrders, resetOrdersState} = useGetOrders();
  const {handleCreateOrder, isErrorCreateOrder, isLoadingCreateOrder, resetCreateOrderState} = useCreateOrder();
  const {handleUpdateOrder, isErrorUpdateOrder, isLoadingUpdateOrder, resetUpdateOrderState} = useUpdateOrder();
  const {handleDeleteOrder, isErrorDeleteOrder, isLoadingDeleteOrder, resetDeleteOrderState} = useDeleteOrder();

  const loading = findState([isLoadingCreateOrder, isLoadingOrders, isLoadingUpdateOrder, isLoadingDeleteOrder]);
  const error = findState([isErrorOrders, isErrorCreateOrder, isErrorUpdateOrder, isErrorDeleteOrder]);

  const resetErrors = () => {
    resetOrdersState();
    resetCreateOrderState();
    resetUpdateOrderState();
    resetDeleteOrderState();
  };

  const setYear = (newYear: number) => setSelectedYear(newYear);
  const handleContextMenu = (e: MouseEvent<HTMLDivElement>, order?: OrderType) => {
    if (order && ctxRef.current) {
      ctxRef.current.show(e);
      setCtxOrder(order);
    }
  };

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
        done: true
      });

      await handleUpdateOrder({
        orderId: ctxOrder.id!,
        updatedOrder: newOrder,
      });

      await handleGetOrders({year: selectedYear});
    }

    closeModal();
  };

  const handleCtxDelete = async () => {
    if (ctxOrder) {
      await handleDeleteOrder({orderId: ctxOrder.id!});
      await handleGetOrders({year: selectedYear});
    }

    closeModal();
  };

  const handleClickByDate = (id: string) => {
    navigate(`/${RouterMap.AccountTable}`, { state: { id } });
  };
  
  const handleSubmit = async (data: OrderFormType) => {
    const deadline = formatDeadlineToServer(data.deadline);
    const details = transformDetails(data.details);
    const newOrder = JSON.stringify({
      ...data,
      id: data.id || uuidv4(),
      done: data.done || false,
      deadline: deadline || [],
      details
    });

    if (ctxOrder) {
      await handleUpdateOrder({orderId: ctxOrder.id!, updatedOrder: newOrder});
    } else {
      await handleCreateOrder({order: newOrder});
    }
    
    await handleGetOrders({year: selectedYear});
    closeModal();
  };

  useEffect(() => {
    handleGetOrders({year: selectedYear});
  }, [selectedYear, handleGetOrders]);

  useEffect(() => {
    if (error) {
      showToast("error", DEFAULT_ERROR_MESSAGE);
      resetErrors();
    }
  }, [error]);

  let content;
  if (loading && !orders) {
    content = <SpinnerBlock isPage />;
  } else {
    content = (
      <PageContent>
        <Calendar
          orders={orders}
          year={selectedYear}
          onChangeYear={setYear}
          onClickCtxMenu={handleContextMenu}
          onClick={handleClickByDate}
          theme={theme}
        />

        <OrderModal
          isOpen={isOpenModal}
          order={ctxOrder}
          isLoading={loading}
          onClose={closeModal}
          onSubmit={handleSubmit}
        />

        <ContextMenu
          model={getContextMenuItems(
            handleCtxAdd,
            handleCtxEdit,
            handleCtxDone,
            handleCtxDelete
          )}
          ref={ctxRef}
        />
      </PageContent>
    );
  }

  return content;
}