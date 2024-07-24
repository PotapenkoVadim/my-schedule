import { OrderFormType, OrderStatus } from "@/types";
import { OrderEntity } from "@/interfaces";

const defaultFormValues = {
  color: "000000",
  customer: "",
  photoSet: "",
  deadline: undefined,
  comment: "",
  status: OrderStatus.InProgress,
  details: [],
};

export const getDefaultFormValues = (
  order?: OrderEntity,
  date?: Date,
): OrderFormType =>
  order
    ? {
        ...order,
        deadline: order?.deadline?.map((item) => new Date(item)) || undefined,
      }
    : {
        ...defaultFormValues,
        ...(date && { deadline: [date] }),
      };
