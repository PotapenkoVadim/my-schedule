import { useEffect, useState } from "react";
import { PageContent, SpinnerBlock, CalendarChangeEvent } from "@/components";
import {AccountTable, AccountTableToolbar} from "./components";
import { useAppContext } from "@/App/context/AppContext";
import { useGetOrders } from "@/hooks";
import { DEFAULT_GETTING_ERROR } from "@/constants";
import { getCurentYearRange } from "./utils";
import { DateRangeType } from "@/types";

export default function AccountTablePage() {
  const {theme, showToast} = useAppContext();
  const {orders, isLoadingOrders, isErrorOrders, handleGetOrders} = useGetOrders();

  const [dateRange, setDateRange] = useState<DateRangeType>(getCurentYearRange());
  const [isShowDone, setIsShowDone] = useState(false);

  const handleIsShowDone = () => setIsShowDone(!isShowDone);
  const handleChangeDateRange = (event: CalendarChangeEvent) => {
    setDateRange(event.target.value);
  };

  useEffect(() => {
    handleGetOrders({year: 2023});
  }, [handleGetOrders]);

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
        <AccountTableToolbar
          theme={theme}
          dates={dateRange}
          checked={isShowDone}
          onChangeDate={handleChangeDateRange}
          onSwitch={handleIsShowDone}
        />

        <AccountTable theme={theme} data={orders} />
      </PageContent>
    );
  }

  return content;
}