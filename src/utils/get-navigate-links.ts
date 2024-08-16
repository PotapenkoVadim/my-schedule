import { PATHS } from "@/constants";

export const getNavigateLinks = (
  navigateTo: (href: string) => void,
  onBeforeNavigate: () => void,
  isAdmin: boolean,
) => [
  {
    path: PATHS.calendar,
    icon: "pi pi-calendar",
    label: "Календарь",
    command: () => {
      onBeforeNavigate();
      navigateTo(PATHS.calendar);
    },
  },
  {
    path: PATHS.table,
    icon: "pi pi-table",
    label: "Таблица заказов",
    command: () => {
      onBeforeNavigate();
      navigateTo(PATHS.table);
    },
  },
  ...(isAdmin
    ? [
        {
          path: PATHS.adminPanel,
          icon: "pi pi-cog",
          label: "Админка",
          command: () => {
            onBeforeNavigate();
            navigateTo(PATHS.adminPanel);
          },
        },
      ]
    : []),
];
