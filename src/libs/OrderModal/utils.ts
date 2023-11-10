import { OrderFormType, OrderType } from "@/types";
import { defaultFormValues } from "./constants";

export const getDefaultFormValues = (order?: OrderType): OrderFormType => {
  return order ? {
    ...order,
    deadline: order?.deadline?.map(item => new Date(item)) || undefined
  } : defaultFormValues;
};