import { UserCredentials } from "@/interfaces";
import { postApi } from "@/utils";

export const signInService = async (credentials: UserCredentials) =>
  postApi("/sign-in", credentials);
