import { PATH_TITLES, PATHS } from "@/constants";
import { UserEntity } from "@/interfaces";
import { isAdmin } from "./is-admin";

export const getNavigateLinks = (
  navigateTo: (href: string) => void,
  user: UserEntity | null,
  onBeforeNavigate?: () => void,
) => {
  const isUserAdmin = isAdmin(user);
  const routes = [];

  if (!user) {
    routes.push({
      path: PATHS.signIn,
      icon: "pi pi-sign-in",
      label: PATH_TITLES.signIn,
      command: () => {
        if (onBeforeNavigate) onBeforeNavigate();
        navigateTo(PATHS.signIn);
      },
    });
  }

  if (Boolean(user) && !isUserAdmin) {
    routes.push(
      {
        path: PATHS.calendar,
        icon: "pi pi-calendar",
        label: PATH_TITLES.calendar,
        command: () => {
          if (onBeforeNavigate) onBeforeNavigate();
          navigateTo(PATHS.calendar);
        },
      },
      {
        path: PATHS.table,
        icon: "pi pi-table",
        label: PATH_TITLES.table,
        command: () => {
          if (onBeforeNavigate) onBeforeNavigate();
          navigateTo(PATHS.table);
        },
      },
    );
  }

  if (isUserAdmin) {
    routes.push({
      path: PATHS.adminPanel,
      icon: "pi pi-cog",
      label: PATH_TITLES.adminPanel,
      command: () => {
        if (onBeforeNavigate) onBeforeNavigate();
        navigateTo(PATHS.adminPanel);
      },
    });
  }

  routes.push({
    path: PATHS.about,
    icon: "pi pi-info-circle",
    label: PATH_TITLES.about,
    command: () => {
      if (onBeforeNavigate) onBeforeNavigate();
      navigateTo(PATHS.about);
    },
  });

  return routes;
};
