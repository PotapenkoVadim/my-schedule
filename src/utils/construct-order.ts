import { OrderDto } from "@/interfaces";
import { OrderFormType, OrderStatus } from "@/types";

export const constructOrder = (
  data: OrderFormType,
  selectedYear: number,
): OrderDto => ({
  ...data,
  deadline: data.deadline?.filter(Boolean),
  status: OrderStatus.InProgress,
  currentYear: selectedYear,
});
