import { RouterMap } from "@/constants";
import { NavigateFunction } from "react-router-dom";
import { OrderDetailsType } from "@/types";
import { format } from "date-fns";

export const getNavigateItems = (navigate: NavigateFunction, hideSidebar: () => void) => [
  {
    path: RouterMap.Calendar,
    icon: "pi pi-calendar",
    label: "Календарь",
    command: () => {
      navigate(`/${RouterMap.Calendar}`);
      hideSidebar();
    }
  },
  {
    path: RouterMap.AccountTable,
    icon: "pi pi-table",
    label: "Таблица заказов",
    command: () => {
      navigate(`/${RouterMap.AccountTable}`);
      hideSidebar();
    }
  }
];

export const formatDeadlineToServer = (deadline?: Array<Date>) => {
  return deadline?.filter(Boolean).map(item => format(item, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"));
};

export const transformDetails = (details?: Array<OrderDetailsType>) => {
  return details?.map(item => ({...item, count: String(item.count), sum: String(item.sum)}));
};