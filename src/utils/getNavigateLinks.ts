import { PATHS } from "@/constants";

export const getNavigateLinks = (
  navigateTo: (href: string) => void,
  onBeforeNavigate: () => void,
) => [
  {
    path: PATHS.calendar,
    icon: "pi pi-calendar",
    label: "Календарь",
    command: () => {
      onBeforeNavigate();
      navigateTo("/calendar");
    },
  },
  {
    path: PATHS.table,
    icon: "pi pi-table",
    label: "Таблица заказов",
    command: () => {
      onBeforeNavigate();
      navigateTo("/order-table");
    },
  },
];
