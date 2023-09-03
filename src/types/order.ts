export type OrderType = {
  id?: string;
  color?: string;
  customer?: string;
  set?: string;
  deadline?: Array<string>;
  comment?: string;
  done?: boolean;
  details?: Array<OrderDetailsType>
};

export type RequestOrderType = {
  year: number;
};

export type OrderDetailsType = {
  count: number;
  description: string;
  sum: number;
};