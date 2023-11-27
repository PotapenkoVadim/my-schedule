import { MouseEvent } from "react";
import { useAppContext, useOrderContext } from "@/App/context";
import { SpinnerBlock } from "@/components";
import { Calendar } from "@/libs";
import { RouterMap } from "@/constants";
import { OrderType } from "@/types";
import { useNavigate } from "react-router-dom";
import { useListenAppWindow } from "@/hooks";

export default function CalendarWrapper({
  selectedYear,
  setSelectedYear
}: {
  selectedYear: number;
  setSelectedYear: (year: number) => void;
}) {
  const navigate = useNavigate();
  const {theme, switchTheme} = useAppContext();
  const {orders, loading, ctxRef, setCtxData, handleNewOrder} = useOrderContext();

  useListenAppWindow(handleNewOrder, switchTheme);

  const setYear = (newYear: number) => setSelectedYear(newYear);
  const handleContextMenu = (e: MouseEvent<HTMLDivElement>, order?: OrderType, date?: Date | null) => {
    if (ctxRef.current) {
      ctxRef.current.show(e);
      setCtxData({order, date});
    }
  };

  const handleClickByDate = (id: string) => {
    navigate(`/${RouterMap.AccountTable}`, { state: { id } });
  };

  let content;
  if (loading && !orders) {
    content = <SpinnerBlock isPage />;
  } else {
    content = (
      <Calendar
        orders={orders}
        year={selectedYear}
        onChangeYear={setYear}
        onClickCtxMenu={handleContextMenu}
        onClick={handleClickByDate}
        theme={theme}
      />
    );
  }

  return content;
}