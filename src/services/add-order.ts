import { OrderDto, OrderListEntity } from "@/interfaces";
import { postApi } from "@/utils";

export const addOrderService = (data: OrderDto): Promise<OrderListEntity> =>
  postApi("/order-list/item", data);
