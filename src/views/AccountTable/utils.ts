import { OrderDetailsType } from "@/types";

export const getCurentYearRange = () => {
  const currentYear = new Date().getFullYear();
  const firstJanuary = new Date(currentYear, 0, 1);

  return [firstJanuary, new Date()];
};

export const calculateDetails = (type: "count" | "sum", orderDetails?: Array<OrderDetailsType>) => (
  orderDetails ? orderDetails.reduce((acc, o) => acc + Number(o[type] ?? 0), 0) : 0
);