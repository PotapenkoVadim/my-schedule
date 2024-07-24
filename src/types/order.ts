import { OrderEntity } from "@/interfaces";

export enum OrderStatus {
  InProgress,
  Ready,
  Done,
}

export type OrderFormType = Partial<
  Omit<
    OrderEntity,
    "deadline" | "id" | "orderListId" | "createdAt" | "updatedAt" | "status"
  >
> & {
  deadline?: Array<Date>;
};
