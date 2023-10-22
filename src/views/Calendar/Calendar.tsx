import { MouseEvent, useEffect, useRef, useState } from "react";
import { useAppContext } from "@/App/context/AppContext";
import { ContextMenu, PageContent, SpinnerBlock, ContextMenuProps } from "@/components";
import { Calendar } from "@/libs";
import { useGetOrders } from "@/hooks";
import { DEFAULT_GETTING_ERROR } from "@/constants";
import { OrderType } from "@/types";
import { getContextMenuItems } from "./utils";

export default function CalendarPage() {
  const ctxRef = useRef<ContextMenu & Readonly<ContextMenuProps>>(null);
  const {theme, showToast} = useAppContext();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [ctxOrder, setCtxOrder] = useState<OrderType>();
  const {orders, isLoadingOrders, isErrorOrders, handleGetOrders} = useGetOrders();

  const setYear = (newYear: number) => setSelectedYear(newYear);
  const handleContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, order?: OrderType) => {
    if (order && ctxRef.current) {
      ctxRef.current.show(e);
      setCtxOrder(order);
    }
  };

  const editOrder = (order?: OrderType) => true;

  const handleCtxEdit = () => {
    editOrder(ctxOrder);
    setCtxOrder(undefined);
  };

  const handleCtxDone = () => {
    editOrder(ctxOrder);
    setCtxOrder(undefined);
  };

  const handleCtxDelete = () => {
    editOrder(ctxOrder);
    setCtxOrder(undefined);
  };

  useEffect(() => {
    handleGetOrders({year: selectedYear});
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
          onClickCtxMenu={handleContextMenu}
          onClick={() => []}
          theme={theme}
        />

        <ContextMenu
          model={getContextMenuItems(handleCtxEdit, handleCtxDone, handleCtxDelete)}
          ref={ctxRef}
        />
      </PageContent>
    );
  }

  return content;
}