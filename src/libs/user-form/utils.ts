import { UserEntity } from "@/interfaces";
import { UserFormType, UserRole } from "@/types";

export const getDefaultFormValues = (user?: UserEntity): UserFormType => ({
  password: "",
  role: user?.role ? user.role : UserRole.User,
  username: user?.username || "",
  telegram: user?.telegram || "",
});
