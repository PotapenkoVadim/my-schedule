import { RouterMap } from "@/constants";
import { NavigateFunction } from "react-router-dom";

export const getNavigateItems = (navigate: NavigateFunction) => [
  {
    path: RouterMap.Calendar,
    icon: "pi pi-calendar",
    label: "Календарь",
    command: () => navigate(`/${RouterMap.Calendar}`)
  },
  {
    path: RouterMap.AccountTable,
    icon: "pi pi-table",
    label: "Таблица заказов",
    command: () => navigate(`/${RouterMap.AccountTable}`)
  }
];