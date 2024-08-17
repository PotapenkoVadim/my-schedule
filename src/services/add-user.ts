import { UserEntity } from "@/interfaces";
import { UserFormType } from "@/types";
import { postApi } from "@/utils";

export const addUserService = (data: UserFormType): Promise<UserEntity> =>
  postApi("/user", data);
