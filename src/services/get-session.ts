import { UserEntity } from "@/interfaces";
import { getApi } from "@/utils";

export const getSessionService = async (
  currentYear: number,
): Promise<UserEntity> => getApi("/session", { currentYear });
