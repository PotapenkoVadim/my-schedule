import { RefObject } from "react";
import { ContextMenu, ContextMenuProps } from "@/components";

export type OrderType = {
  id?: string;
  color?: string;
  customer?: string;
  set?: string;
  deadline?: Array<string>;
  comment?: string;
  done?: boolean;
  details?: Array<OrderDetailsType>;
  ready?: boolean;
};

export type OrderFormType = Omit<OrderType, "deadline"> & {
  deadline?: Array<Date>;
};

export type RequestOrderType = {year: number};
export type RequestCreateOrderType = {
  order: string;
};

export type RequestUpdateOrderType = {
  orderId: string;
  updatedOrder: string;
};

export type RequestDeleteOrderType = {
  orderId: string;
};

export type OrderDetailsType = {
  count: number;
  description: string;
  sum: number;
};

export type OrderContextType = {
  orders?: Array<OrderType>;
  loading?: boolean;
  ctxRef: RefObject<ContextMenu & Readonly<ContextMenuProps>>
  setOrder: (order?: OrderType) => void;
  handleGetOrders: (options: RequestOrderType) => Promise<void>;
};