import { OrderFormType, OrderType } from "@/types";
import { defaultFormValues } from "./constants";

export const getDefaultFormValues = (order?: OrderType, date?: Date): OrderFormType => {
  return order ? {
    ...order,
    deadline: order?.deadline?.map(item => new Date(item)) || undefined
  } : {
    ...defaultFormValues,
    ...date && {deadline: [date]}
  };
};