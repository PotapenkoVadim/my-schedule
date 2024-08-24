import { OrderEntity } from "@/interfaces";
import { OrderStatus } from "@/types";

export const handleDoneStatus = (order?: OrderEntity) =>
  order?.status === OrderStatus.Done ? OrderStatus.Ready : OrderStatus.Done;
