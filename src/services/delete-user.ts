import { UserEntity } from "@/interfaces";
import { deleteApi } from "@/utils";

export const deleteUserService = (id?: number): Promise<UserEntity> =>
  deleteApi(`/user/${id}`);
