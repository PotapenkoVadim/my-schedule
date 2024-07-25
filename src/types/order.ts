import { OrderEntity } from "@/interfaces";

export enum OrderStatus {
  InProgress = "InProgress",
  Ready = "Ready",
  Done = "Done",
}

export type OrderFormType = Partial<
  Omit<
    OrderEntity,
    "deadline" | "id" | "orderListId" | "createdAt" | "updatedAt" | "status"
  >
> & {
  deadline?: Array<Date>;
};
