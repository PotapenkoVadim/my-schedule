import { OrderEntity } from "@/interfaces";

export const enum OrderStatus {
  InProgress,
  Ready,
  Done,
}

export type OrderFormType = Partial<
  Omit<
    OrderEntity,
    "deadline" | "id" | "orderListId" | "createdAt" | "updatedAt"
  >
> & {
  deadline?: Array<Date>;
};
