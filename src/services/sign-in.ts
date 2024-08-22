import { UserCredentials } from "@/interfaces";
import { postApi } from "@/utils";

export const signInService = async (
  credentials: UserCredentials,
): Promise<{ token: string }> => postApi("/sign-in", credentials);
