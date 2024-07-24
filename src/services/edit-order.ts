import { OrderDto, OrderListEntity } from "@/interfaces";
import { patchApi } from "@/utils";

export const editOrderService = (
  id: number,
  data: OrderDto,
): Promise<OrderListEntity> => patchApi(`/order-list/item/${id}`, data);
