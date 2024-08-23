import { PATH_TITLES, PATHS } from "@/constants";
import { UserEntity } from "@/interfaces";
import { isAdmin } from "./is-admin";

export const getNavigateLinks = (
  navigateTo: (href: string) => void,
  onBeforeNavigate: () => void,
  user: UserEntity | null,
) => {
  const routes = [];
  const isUserAdmin = isAdmin(user);

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

  return routes;
};
