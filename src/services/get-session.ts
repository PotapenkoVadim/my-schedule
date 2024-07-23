import { UserEntity } from "@/interfaces";
import { getApi } from "@/utils";

export const getSessionService = async (): Promise<UserEntity> =>
  getApi("/session");
