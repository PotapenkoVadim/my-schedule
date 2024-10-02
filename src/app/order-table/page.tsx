"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { OrderModal, OrderTable } from "@/libs";
import { useSelectedYearStore } from "@/stores";
import { useListenOrderTray, useOrder, useSession } from "@/hooks";
import { PageContent, Spinner } from "@/components";
import { WENT_WRONG_ERROR } from "@/constants";
import { OrderFormType } from "@/types";
import { withPrivateRoute } from "@/hoc";
import { constructOrder } from "@/utils";

function OrderTablePage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  const { theme, showToast } = useAppContext();
  const { currentUser, isSessionLoading, isSessionError } = useSession();

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
    addOrder(constructOrder(data, selectedYear));
  };

  useListenOrderTray(openModal);

  let content;
  if (isSessionLoading || (!currentUser && !isSessionError)) {
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

  return <PageContent>{content}</PageContent>;
}

export default withPrivateRoute(OrderTablePage, "onlyUser");
