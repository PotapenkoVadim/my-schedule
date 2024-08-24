import { MouseEvent, useCallback, useRef, useState } from "react";
import { OrderEntity } from "@/interfaces";
import { ContextMenu, ContextMenuProps } from "@/components";

export const useOrderMenuCtx = () => {
  const ctxRef = useRef<ContextMenu & Readonly<ContextMenuProps>>(null);

  const [ctxOrder, setCtxOrder] = useState<OrderEntity>();
  const [ctxDate, setCtxDate] = useState<Date>();

  const handleContextMenu = useCallback(
    (
      event: MouseEvent<HTMLDivElement>,
      order?: OrderEntity,
      date?: Date | null,
    ) => {
      if (ctxRef.current) {
        ctxRef.current.show(event);

        setCtxOrder(order);
        if (date) setCtxDate(date);
      }
    },
    [],
  );

  const resetContextState = useCallback(() => {
    setCtxOrder(undefined);
  }, []);

  return {
    ctxRef,
    ctxOrder,
    ctxDate,
    handleContextMenu,
    resetContextState,
  };
};
