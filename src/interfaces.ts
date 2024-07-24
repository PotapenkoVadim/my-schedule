import { OrderStatus, ThemeVariant, UserRole } from "./types";

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserSettingsEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
  ownerId: number;
  theme: ThemeVariant;
}

export interface UserEntity {
  id: number;
  username: string;
  role: UserRole;
  hash: string;
  salt: string;
  settings?: {};
  orders?: OrderListEntity;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDetailsEntity {
  id: number;
  count: string;
  description: string;
  sum: string;
  orderId: number;
}

export interface OrderEntity {
  id: number;
  color: string;
  customer: string;
  photoSet: string;
  deadline: Array<string>;
  comment?: string;
  status: OrderStatus;
  details: Array<OrderDetailsEntity>;
  orderListId: number;
  createdAt: string;
  updatedAt: string;
}

export interface OrderDto {
  color?: string;
  customer?: string;
  photoSet?: string;
  deadline?: Array<string>;
  comment?: string;
  status?: OrderStatus | string;
  details?: Array<Partial<OrderDetailsEntity>>;
}

export interface OrderListEntity {
  id: number;
  items?: Array<OrderEntity>;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}
