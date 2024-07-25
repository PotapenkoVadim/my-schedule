import { OrderDetailsEntity } from "@/interfaces";

export const calculateDetails = (
  type: "count" | "sum",
  orderDetails?: Array<OrderDetailsEntity>,
) =>
  orderDetails
    ? orderDetails.reduce((acc, o) => acc + Number(o[type] ?? 0), 0)
    : 0;
