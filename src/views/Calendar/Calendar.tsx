import { useEffect, useState } from "react";
import { useAppContext } from "@/App/context/AppContext";
import { PageContent, SpinnerBlock } from "@/components";
import { Calendar } from "@/libs";
import { useGetOrders } from "./hooks";
import { DEFAULT_GETTING_ERROR } from "@/constants";

export default function CalendarPage() {
  const {theme, showToast} = useAppContext();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const {orders, isLoadingOrders, isErrorOrders, handleGetOrders} = useGetOrders();

  const setYear = (newYear: number) => setSelectedYear(newYear);

  useEffect(() => {
    handleGetOrders(selectedYear);
  }, [selectedYear, handleGetOrders]);

  useEffect(() => {
    if (isErrorOrders) {
      showToast("error", DEFAULT_GETTING_ERROR);
    }
  }, [isErrorOrders]);

  let content;
  if (isLoadingOrders && !orders) {
    content = <SpinnerBlock isPage />;
  } else {
    content = (
      <PageContent>
        <Calendar
          orders={orders}
          year={selectedYear}
          onChangeYear={setYear}
          onClick={() => []}
          theme={theme}
        />
      </PageContent>
    );
  }

  return content;
}