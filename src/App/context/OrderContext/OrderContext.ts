import { createContext, useContext } from "react";
import { OrderContextType } from "@/types";

export const OrderContext = createContext<OrderContextType | null>(null);

export const useOrderContext = (): OrderContextType => useContext(OrderContext) as OrderContextType;