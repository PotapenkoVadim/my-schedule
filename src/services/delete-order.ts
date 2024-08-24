import { OrderListEntity } from "@/interfaces";
import { deleteApi } from "@/utils";

export const deleteOrderService = (
  id: number,
  currentYear: number,
): Promise<OrderListEntity> =>
  deleteApi(`/order-list/item/${id}?currentYear=${currentYear}`);
