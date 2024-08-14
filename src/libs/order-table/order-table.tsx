"use client";

import {
  ChangeEvent,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { OrderStatus, ThemeVariant } from "@/types";
import { FormEvent } from "primereact/ts-helpers";
import { DataTableFilterMeta } from "@/components";
import { FilterMatchMode } from "primereact/api";
import { OrderListEntity } from "@/interfaces";
import { Table, Toolbar } from "./components";
import styles from "./order-table.module.scss";

export function OrderTable({
  theme,
  year,
  orderList,
  isLoading,
  changeYear,
}: {
  theme: ThemeVariant;
  year: Date;
  orderList: OrderListEntity | null;
  isLoading: boolean;
  changeYear: (date: Date) => void;
}) {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("id");

  const [isShowDone, setIsShowDone] = useState(false);
  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const switchShowDone = () => setIsShowDone(!isShowDone);
  const handleChangeDate = (
    event: FormEvent<Date, SyntheticEvent<Element, Event>>,
  ) => {
    if (event.value) {
      changeYear(event.value);
    }
  };

  const changeFilter = useCallback(
    (value: string) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore see: https://primereact.org/datatable/
      filters.global.value = value;

      setFilters(filters);
      setGlobalFilterValue(value);
    },
    [filters],
  );

  const onGlobalFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    changeFilter(event.target.value);
  };

  const filteredOrders = orderList?.items?.filter((item) =>
    isShowDone ? true : item.status !== OrderStatus.Done,
  );

  useEffect(() => {
    if (orderId && orderList) {
      const selectedOrder = orderList.items?.find(
        (item) => item.id === Number(orderId),
      );

      if (selectedOrder && globalFilterValue === undefined) {
        changeFilter(selectedOrder.photoSet);
      }
    }
  }, [orderId, orderList, globalFilterValue, changeFilter]);

  return (
    <div className={styles.table}>
      <Toolbar
        checked={isShowDone}
        date={year}
        onChangeDate={handleChangeDate}
        onChangeFilter={onGlobalFilterChange}
        onSwitch={switchShowDone}
        theme={theme}
        filterValue={globalFilterValue}
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
