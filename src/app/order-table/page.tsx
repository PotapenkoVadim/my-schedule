"use client";

import { useAppContext } from "@/context";
import { OrderTable } from "@/libs";
import { useUserStore } from "@/stores/user";
import { useSession } from "@/hooks";
import { Spinner } from "@/components";
import styles from "./page.module.scss";

export default function OrderTablePage() {
  const { theme } = useAppContext();
  const { isSessionLoading, isSessionError } = useSession();

  const [user, selectedYear, changeYear] = useUserStore(
    ({ user, selectedYear, changeYear }) => [user, selectedYear, changeYear],
  );

  const setSelectedYear = (date: Date) => changeYear(date.getFullYear());

  let content;
  if (isSessionLoading || (!user && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <OrderTable
        theme={theme}
        year={new Date(String(selectedYear))}
        changeYear={setSelectedYear}
      />
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
