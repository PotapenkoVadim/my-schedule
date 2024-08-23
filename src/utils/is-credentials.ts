import { UserCredentials } from "@/interfaces";

export const isCredentials = (
  credentials?: UserCredentials,
): credentials is UserCredentials => credentials !== undefined;
