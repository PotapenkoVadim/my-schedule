import { UserEntity } from "@/interfaces";

export enum UserRole {
  Admin = "Admin",
  User = "User",
  Guest = "Guest",
}

export const enum UserScopes {
  allowOrder,
  allowUser,
  allowCommon,
}

export type UserFormType = Pick<
  UserEntity,
  "role" | "username" | "telegram"
> & {
  password: string;
};
