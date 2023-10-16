import { OrderDetailsType } from "../types";

export interface Order {
  id?: string;
  color?: string;
  customer?: string;
  set?: string;
  deadline?: Array<string>;
  comment?: string;
  done?: boolean;
  details?: Array<OrderDetailsType>;
  ready?: boolean;
}