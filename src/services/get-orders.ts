import { OrderListEntity } from "@/interfaces";
import { getApi } from "@/utils";

export const getOrdersService = (
  id: number,
  currentYear: number,
): Promise<OrderListEntity> => getApi(`/order-list/${id}`, { currentYear });
