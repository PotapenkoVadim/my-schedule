import { UserEntity } from "@/interfaces";
import { UserFormType } from "@/types";
import { patchApi } from "@/utils";

export const editUserService = (
  id: number,
  data: UserFormType,
): Promise<UserEntity> => patchApi(`/user/${id}`, data);
