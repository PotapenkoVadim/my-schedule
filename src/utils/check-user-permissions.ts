import { UserEntity } from "@/interfaces";
import { RoutePermissions } from "@/types";
import { isAdmin } from "./is-admin";

export const checkUserPermissions = (
  routePermission: RoutePermissions,
  user?: UserEntity | null,
) => {
  const isUser = Boolean(user);
  const routerConfig = {
    onlyAdmin: isAdmin(user),
    onlyLoggedIn: isUser,
    onlyUser: user && !isAdmin(user),
    onlyLoggedOut: !isUser,
  };

  return Boolean(routerConfig[routePermission]);
};
