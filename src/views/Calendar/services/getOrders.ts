import { apiClient } from "@/core";

export const getOrders = (year: number) => {
  return apiClient.get("get_orders", {year});
};