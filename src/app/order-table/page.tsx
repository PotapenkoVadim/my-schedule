"use client";

import { Suspense, useState } from "react";
import { useAppContext } from "@/context";
import { OrderModal, OrderTable } from "@/libs";
import { useSelectedYearStore } from "@/stores";
import { useOrder, usePrivateRoute, useSession } from "@/hooks";
import { Spinner } from "@/components";
import { WENT_WRONG_ERROR } from "@/constants";
import { OrderFormType, OrderStatus } from "@/types";
import styles from "./page.module.scss";

export default function OrderTablePage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { theme, showToast } = useAppContext();
  const { currentUser, isSessionLoading, isSessionError } = useSession();
  const { isApprove } = usePrivateRoute(currentUser, "onlyUser");

  const [selectedYear, changeYear] = useSelectedYearStore(
    ({ selectedYear, changeYear }) => [selectedYear, changeYear],
  );

  const { orderList, addOrder, getOrders, isLoading, isGetOrdersLoading } =
    useOrder({
      onSuccess: closeModal,
      onError: () => {
        showToast("error", WENT_WRONG_ERROR);
        closeModal();
      },
    });

  const handleChangeYear = async (date: Date) => {
    if (currentUser?.orders?.id) {
      const year = date.getFullYear();

      await getOrders(currentUser.orders.id, year);
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
  if (isSessionLoading || !isApprove || (!currentUser && !isSessionError)) {
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
          onAddOrder={openModal}
          user={currentUser}
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
    <Suspense>
      <main data-theme={theme} className={styles.page}>
        {content}
      </main>
    </Suspense>
  );
}
