import { useCallback, useReducer } from "react";
import { DataTableFilterMeta } from "@/components";
import { FilterMatchMode } from "primereact/api";
import { OrderStatus } from "@/types";

type OrderTableActions =
  | { type: "switch_show_done" }
  | { type: "change_filter"; payload: string };

interface OrderTableState {
  isShowDone: boolean;
  globalFilterValue?: string;
  filters: DataTableFilterMeta;
}

const orderTableReducer = (
  state: OrderTableState,
  action: OrderTableActions,
) => {
  switch (action.type) {
    case "change_filter":
      return {
        ...state,
        globalFilterValue: action.payload,
        filters: {
          global: {
            ...state.filters.global,
            value: action.payload,
          },
        },
      };

    case "switch_show_done":
      return {
        ...state,
        isShowDone: !state.isShowDone,
      };

    default:
      throw new Error();
  }
};

export const useOrderTable = (
  selectedFilterValue?: string,
  orderStatus?: OrderStatus,
) => {
  const [state, dispatch] = useReducer(orderTableReducer, {
    isShowDone: orderStatus === OrderStatus.Done,
    globalFilterValue: selectedFilterValue,
    filters: {
      global: {
        value: selectedFilterValue || null,
        matchMode: FilterMatchMode.CONTAINS,
      },
    },
  });

  const switchShowDone = useCallback(() => {
    dispatch({ type: "switch_show_done" });
  }, []);

  const changeFilter = useCallback((value: string) => {
    dispatch({ type: "change_filter", payload: value });
  }, []);

  return {
    ...state,
    switchShowDone,
    changeFilter,
  };
};
