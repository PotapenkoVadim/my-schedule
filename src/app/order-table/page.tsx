"use client";

import { useState } from "react";
import { useAppContext } from "@/context";
import { OrderTable } from "@/libs";
import { useUserStore } from "@/stores/user";
import { useSession } from "@/hooks";
import { Spinner } from "@/components";
import styles from "./page.module.scss";

export default function OrderTablePage() {
  const [selectedYear, setSelectedYear] = useState(new Date());

  const { theme } = useAppContext();
  const { isSessionLoading, isSessionError } = useSession();

  const [user] = useUserStore(({ user }) => [user]);

  let content;
  if (isSessionLoading || (!user && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <OrderTable
        theme={theme}
        year={selectedYear}
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
