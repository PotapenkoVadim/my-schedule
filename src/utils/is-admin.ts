import { UserEntity } from "@/interfaces";
import { UserRole } from "@/types";

export const isAdmin = (user: UserEntity | null) => {
  if (!user) return false;

  return user.role.toString() === UserRole.Admin;
};
