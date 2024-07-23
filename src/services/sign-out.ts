import { getApi } from "@/utils";

export const signOutService = async (): Promise<{ status: number }> =>
  getApi("/sign-out");
