import {
  ChangeEventHandler,
  SyntheticEvent,
  useEffect,
  useState
} from "react";
import {
  SpinnerBlock,
  CalendarChangeEvent,
  DataTableFilterMeta,
} from "@/components";
import { useAppContext, useOrderContext } from "@/App/context";
import { FilterMatchMode } from "primereact/api";
import { useLocation } from "react-router-dom";
import { OrderType } from "@/types";
import AccountTable from "../Table/Table";
import AccountTableToolbar from "../Toolbar/Toolbar";

export default function AccountTableWrapper({
  selectedDate,
  setSelectedDate
}: {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}) {
  const {state} = useLocation();
  const {theme} = useAppContext();
  const {orders, loading, ctxRef, setCtxData} = useOrderContext();

  const [globalFilterValue, setGlobalFilterValue] = useState<string>();
  const [isShowDone, setIsShowDone] = useState(false);
  const [filters, setFilters] = useState<DataTableFilterMeta>({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const handleIsShowDone = () => setIsShowDone(!isShowDone);
  const handleChangeDateRange = (event: CalendarChangeEvent) => {
    setSelectedDate((event.value as Date));
  };

  const changeFilter = (value: string) => {
    const _filters = { ...filters };
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore see: https://primereact.org/datatable/
    _filters["global"].value = value;

    setFilters(_filters);
    setGlobalFilterValue(value);
  };

  const onGlobalFilterChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    changeFilter(event.target.value);
  };

  const handleContextMenu = (e: SyntheticEvent<Element, Event>, order?: OrderType) => {
    if (order && ctxRef.current) {
      ctxRef.current.show(e);
      setCtxData({order});
    }
  };

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
  if (loading && !orders) {
    content = <SpinnerBlock isPage />;
  } else {
    content = (
      <>
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
          onContextClick={handleContextMenu}
        />
      </>
    );
  }

  return content;
}