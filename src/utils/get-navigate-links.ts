import { PATH_TITLES, PATHS } from "@/constants";
import { UserEntity } from "@/interfaces";
import { isAdmin } from "./is-admin";

export const getNavigateLinks = (
  navigateTo: (href: string) => void,
  onBeforeNavigate: () => void,
  user: UserEntity | null,
) => {
  const isUserAdmin = isAdmin(user);
  const routes = [];

  if (!user) {
    routes.push({
      path: PATHS.signIn,
      icon: "pi pi-sign-in",
      label: PATH_TITLES.signIn,
      command: () => {
        onBeforeNavigate();
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
          onBeforeNavigate();
          navigateTo(PATHS.calendar);
        },
      },
      {
        path: PATHS.table,
        icon: "pi pi-table",
        label: PATH_TITLES.table,
        command: () => {
          onBeforeNavigate();
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
        onBeforeNavigate();
        navigateTo(PATHS.adminPanel);
      },
    });
  }

  routes.push({
    path: PATHS.about,
    icon: "pi pi-info-circle",
    label: PATH_TITLES.about,
    command: () => {
      onBeforeNavigate();
      navigateTo(PATHS.about);
    },
  });

  return routes;
};
