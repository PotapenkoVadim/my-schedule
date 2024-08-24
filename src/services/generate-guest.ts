import { UserCredentials } from "@/interfaces";
import { getApi } from "@/utils";

export const generateGuestService = (): Promise<UserCredentials> =>
  getApi("/user/generate");
