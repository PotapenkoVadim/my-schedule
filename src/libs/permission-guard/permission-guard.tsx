import { UserScopes } from "@/types";
import { UserEntity } from "@/interfaces";
import { ReactNode } from "react";
import { PERMISSIONS } from "@/constants";
import { hasPermission } from "@/utils";

export function PermissionGuard({
  children,
  scopes = [],
  currentUser,
}: {
  children: ReactNode;
  scopes: Array<UserScopes>;
  currentUser: UserEntity | null;
}) {
  if (!currentUser) return null;

  const role = currentUser?.role;
  const permissions = PERMISSIONS[role];

  const permissionsGranted = hasPermission(scopes, permissions);

  if (!permissionsGranted) return null;

  return children;
}
