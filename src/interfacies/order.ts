import { OrderDetailsType } from "../types";

export interface Order {
  id: string;
  color: string;
  customer: string;
  set: string;
  deadline: [Date, Date];
  comment: string;
  done: boolean;
  details: Array<OrderDetailsType>
}