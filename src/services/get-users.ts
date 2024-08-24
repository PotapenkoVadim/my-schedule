import { UserEntity } from "@/interfaces";
import { getApi } from "@/utils";

export const getUsersService = (): Promise<Array<UserEntity>> =>
  getApi("/user");
