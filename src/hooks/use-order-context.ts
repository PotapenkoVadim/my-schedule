import { MouseEvent, useRef, useState } from "react";
import { OrderEntity } from "@/interfaces";
import { ContextMenu, ContextMenuProps } from "@/components";

export const useOrderContext = () => {
  const ctxRef = useRef<ContextMenu & Readonly<ContextMenuProps>>(null);

  const [ctxOrder, setCtxOrder] = useState<OrderEntity>();
  const [ctxDate, setCtxDate] = useState<Date>();

  const handleContextMenu = (
    event: MouseEvent<HTMLDivElement>,
    order?: OrderEntity,
    date?: Date | null,
  ) => {
    if (ctxRef.current) {
      ctxRef.current.show(event);

      setCtxOrder(order);
      if (date) setCtxDate(date);
    }
  };

  const resetContextState = () => {
    setCtxOrder(undefined);
    setCtxDate(undefined);
  };

  return {
    ctxRef,
    ctxOrder,
    ctxDate,
    handleContextMenu,
    resetContextState,
  };
};
