import { create } from "zustand";
import { OrderListEntity } from "@/interfaces";

interface OrderState {
  orderList: OrderListEntity | null;
  setOrderList: (orderList: OrderListEntity | null) => void;
}

export const useOrderStore = create<OrderState>((set) => ({
  orderList: null,
  setOrderList: (orderList: OrderListEntity | null) => set({ orderList }),
}));
