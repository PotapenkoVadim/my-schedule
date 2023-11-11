import { OrderDetailsType } from "@/types";

export const calculateDetails = (type: "count" | "sum", orderDetails?: Array<OrderDetailsType>) => (
  orderDetails ? orderDetails.reduce((acc, o) => acc + Number(o[type] ?? 0), 0) : 0
);