import { OrderEntity, OrderListEntity } from "@/interfaces";
import { postApi } from "@/utils";

export const addOrderService = (
  data: Partial<OrderEntity>,
): Promise<OrderListEntity> => postApi("/order-list/item", data);
