import { UserCredentials, UserEntity } from "@/interfaces";
import { postApi } from "@/utils";

export const signInService = async (
  credentials: UserCredentials,
): Promise<UserEntity> => postApi("/sign-in", credentials);
