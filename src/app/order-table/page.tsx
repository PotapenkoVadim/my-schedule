"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { useSearchParams } from "next/navigation";
import { OrderModal, OrderTable } from "@/libs";
import { useUserStore } from "@/stores/user";
import { useFetch, useOrder, useSession } from "@/hooks";
import { Spinner } from "@/components";
import { getOrdersService } from "@/services";
import { useOrderStore } from "@/stores/order";
import { WENT_WRONG_ERROR } from "@/constants";
import { OrderFormType, OrderStatus } from "@/types";
import styles from "./page.module.scss";

export default function OrderTablePage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { theme, showToast } = useAppContext();
  const { isSessionLoading, isSessionError } = useSession();

  const [orderList, setOrderList] = useOrderStore(
    ({ orderList, setOrderList }) => [orderList, setOrderList],
  );

  const [user, selectedYear, changeYear] = useUserStore(
    ({ user, selectedYear, changeYear }) => [user, selectedYear, changeYear],
  );

  const { addOrder, isLoading } = useOrder({
    onSuccess: (response) => {
      setOrderList(response || null);
      closeModal();
    },
    onError: () => {
      showToast("error", WENT_WRONG_ERROR);
      closeModal();
    },
  });

  const { handleFetch: getOrders, isLoading: isGetOrdersLoading } = useFetch({
    queryFn: getOrdersService,
    onSuccess: (response) => setOrderList(response || null),
    onError: () => showToast("error", WENT_WRONG_ERROR),
  });

  const handleChangeYear = async (date: Date) => {
    if (user?.orders?.id) {
      const year = date.getFullYear();

      await getOrders(user.orders.id, year);
      changeYear(year);
    }
  };

  const onSubmitOrderForm = (data: OrderFormType) => {
    const order = {
      ...data,
      status: OrderStatus.InProgress,
      currentYear: selectedYear,
    };

    addOrder(order);
  };

  let content;
  if (isSessionLoading || (!user && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <OrderTable
          theme={theme}
          year={new Date(String(selectedYear))}
          orderList={orderList}
          isLoading={isGetOrdersLoading}
          changeYear={handleChangeYear}
          orderId={orderId}
          onAddOrder={openModal}
          user={user}
        />

        <OrderModal
          isOpen={isOpenModal}
          isLoading={isLoading}
          onClose={closeModal}
          onSubmit={onSubmitOrderForm}
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
