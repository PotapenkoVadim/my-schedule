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
        color: order.color,
        customer: order.customer,
        photoSet: order.photoSet,
        comment: order.comment,
        details: order.details,
        deadline: order?.deadline?.map((item) => new Date(item)) || undefined,
      }
    : {
        ...defaultFormValues,
        ...(date && { deadline: [date] }),
      };
