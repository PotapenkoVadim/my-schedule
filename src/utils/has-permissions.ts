import { UserScopes } from "@/types";

export const hasPermission = (
  scopes: Array<UserScopes>,
  permissions: Array<UserScopes | never>,
) => {
  const scopesMap = {} as Record<UserScopes, boolean>;
  scopes.forEach((scope) => (scopesMap[scope] = true));

  return permissions.some((permission) => scopesMap[permission]);
};
