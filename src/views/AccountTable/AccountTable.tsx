import { ChangeEventHandler, useEffect, useState } from "react";
import { PageContent, SpinnerBlock, CalendarChangeEvent, DataTableFilterMeta } from "@/components";
import {AccountTable, AccountTableToolbar} from "./components";
import { useAppContext } from "@/App/context/AppContext";
import { useGetOrders } from "@/hooks";
import { DEFAULT_ERROR_MESSAGE } from "@/constants";
import { FilterMatchMode } from "primereact/api";
import { useLocation } from "react-router-dom";

export default function AccountTablePage() {
  const {state} = useLocation();
  const {theme, showToast} = useAppContext();

  const {orders, isLoadingOrders, isErrorOrders, handleGetOrders, resetOrdersState} = useGetOrders();

  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isShowDone, setIsShowDone] = useState(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const resetErrors = () => {
    resetOrdersState();
  };

  const handleIsShowDone = () => setIsShowDone(!isShowDone);
  const handleChangeDateRange = (event: CalendarChangeEvent) => {
    setSelectedDate((event.value as Date));
  };

  const changeFilter = (value: string) => {
    const _filters = { ...filters };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore see https://primereact.org/datatable/
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onGlobalFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    changeFilter(event.target.value);
  };

  useEffect(() => {
    if (selectedDate) {
      handleGetOrders({year: selectedDate.getFullYear()});
    }
  }, [selectedDate, handleGetOrders]);

  useEffect(() => {
    if (isErrorOrders) {
      showToast("error", DEFAULT_ERROR_MESSAGE);
      resetErrors();
    }
  }, [isErrorOrders]);

  useEffect(() => {
    if (state?.id && orders) {
      const selectedOrderd = orders.find(item => item.id === state.id);
      const set = selectedOrderd?.set;

      if (set && globalFilterValue === undefined) {
        changeFilter(set);
      }
    }
  }, [state, orders, globalFilterValue]);

  const filteredOrders = orders?.filter(item => isShowDone ? true : !item.done);

  let content;
  if (isLoadingOrders && !orders) {
    content = <SpinnerBlock isPage />;
  } else {
    content = (
      <PageContent>
        <AccountTableToolbar
          theme={theme}
          date={selectedDate}
          checked={isShowDone}
          onChangeDate={handleChangeDateRange}
          onSwitch={handleIsShowDone}
          onChangeFilter={onGlobalFilterChange}
          filterValue={globalFilterValue}
        />

        <AccountTable
          theme={theme}
          data={filteredOrders}
          filters={filters}
        />
      </PageContent>
    );
  }

  return content;
}