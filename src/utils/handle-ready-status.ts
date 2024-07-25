import { OrderEntity } from "@/interfaces";
import { OrderStatus } from "@/types";

export const handleReadyStatus = (order?: OrderEntity) =>
  order?.status === OrderStatus.Ready
    ? OrderStatus.InProgress
    : OrderStatus.Ready;
