import { apiClient } from "@/core";
import {
  OrderType,
  RequestCreateOrderType,
  RequestDeleteOrderType,
  RequestOrderType,
  RequestUpdateOrderType
} from "@/types";

export const getOrders = (params: RequestOrderType) => {
  return apiClient.get<Array<OrderType>, RequestOrderType>("get_orders", params);
};

export const createOrder = (params: RequestCreateOrderType) => {
  return apiClient.post<Array<OrderType>, RequestCreateOrderType>("add_order", params);
};

export const updateOrder = (params: RequestUpdateOrderType) => {
  return apiClient.put<Array<OrderType>, RequestUpdateOrderType>("change_order", params);
};

export const deleteOrder = (params: RequestDeleteOrderType) => {
  return apiClient.delete<Array<OrderType>, RequestDeleteOrderType>("remove_order", params);
};