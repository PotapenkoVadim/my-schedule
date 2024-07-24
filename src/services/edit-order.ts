import { OrderEntity, OrderListEntity } from "@/interfaces";
import { patchApi } from "@/utils";

export const editOrderService = (
  id: number,
  data: Partial<OrderEntity>,
): Promise<OrderListEntity> => patchApi(`/order-list/item/${id}`, data);
