"use client";

import { useAppContext } from "@/context";
import { OrderTable } from "@/libs";
import { useUserStore } from "@/stores/user";
import { useFetch, useSession } from "@/hooks";
import { Spinner } from "@/components";
import { getOrdersService } from "@/services";
import { useOrderStore } from "@/stores/order";
import { WENT_WRONG_ERROR } from "@/constants";
import styles from "./page.module.scss";

export default function OrderTablePage() {
  const { theme, showToast } = useAppContext();
  const { isSessionLoading, isSessionError } = useSession();

  const [orderList, setOrderList] = useOrderStore(
    ({ orderList, setOrderList }) => [orderList, setOrderList],
  );

  const [user, selectedYear, changeYear] = useUserStore(
    ({ user, selectedYear, changeYear }) => [user, selectedYear, changeYear],
  );

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

  let content;
  if (isSessionLoading || (!user && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <OrderTable
        theme={theme}
        year={new Date(String(selectedYear))}
        orderList={orderList}
        isLoading={isGetOrdersLoading}
        changeYear={handleChangeYear}
      />
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
