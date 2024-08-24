import { PATHS } from "@/constants";
import { UserEntity } from "@/interfaces";
import { UserRole } from "@/types";

export const getInitialPath = (user?: UserEntity | null) => {
  switch (user?.role) {
    case UserRole.Admin:
      return PATHS.adminPanel;

    case UserRole.Guest:
    case UserRole.User:
      return PATHS.calendar;

    default:
      return PATHS.signIn;
  }
};
