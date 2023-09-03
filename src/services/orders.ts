import { apiClient } from "@/core";
import { OrderType, RequestOrderType } from "@/types";

export const getOrders = (params: RequestOrderType) => {
  return apiClient.get<OrderType, RequestOrderType>("get_orders", params);
};