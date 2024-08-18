"use client";

import { ChangeEvent, SyntheticEvent } from "react";
import { useSearchParams } from "next/navigation";
import { OrderStatus, ThemeVariant } from "@/types";
import { FormEvent } from "primereact/ts-helpers";
import { OrderListEntity, UserEntity } from "@/interfaces";
import { Table, Toolbar } from "./components";
import { useOrderTable } from "./hooks";
import styles from "./order-table.module.scss";

export function OrderTable({
  theme,
  year,
  orderList,
  isLoading,
  user,
  changeYear,
  onAddOrder,
}: {
  theme: ThemeVariant;
  year: Date;
  user: UserEntity | null;
  orderList: OrderListEntity | null;
  isLoading: boolean;
  changeYear: (date: Date) => void;
  onAddOrder: () => void;
}) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const selectedOrder = orderList?.items?.find(
    (item) => item.id === Number(orderId),
  );

  const {
    changeFilter,
    filters,
    isShowDone,
    switchShowDone,
    globalFilterValue,
  } = useOrderTable(selectedOrder?.photoSet, selectedOrder?.status);

  const handleChangeDate = (
    event: FormEvent<Date, SyntheticEvent<Element, Event>>,
  ) => {
    if (event.value) {
      changeYear(event.value);
    }
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeFilter(event.target.value);
  };

  const filteredOrders = orderList?.items?.filter((item) =>
    isShowDone ? true : item.status !== OrderStatus.Done,
  );

  return (
    <div className={styles.table}>
      <Toolbar
        checked={isShowDone}
        date={year}
        onChangeDate={handleChangeDate}
        onChangeFilter={handleFilterChange}
        onSwitch={switchShowDone}
        theme={theme}
        filterValue={globalFilterValue}
        onAddOrder={onAddOrder}
        user={user}
      />

      <Table
        isLoading={isLoading}
        filters={filters}
        theme={theme}
        data={filteredOrders}
      />
    </div>
  );
}
