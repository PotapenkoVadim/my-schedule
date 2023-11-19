import { OrderType, RequestOrderType } from "@/types";
import { useCallback, useState } from "react";
import { getOrders } from "@/services";

export const useGetOrders = () => {
  const [orders, setOrders] = useState<Array<OrderType>>();
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [isErrorOrders, setIsErrorOrders] = useState(false);

  const handleGetOrders = useCallback(async (options: RequestOrderType) => {
    setIsLoadingOrders(true);

    try {
      const response = await getOrders(options);

      setOrders(response);
    } catch(error) {
      setIsErrorOrders(true);
    } finally {
      setIsLoadingOrders(false);
    }
  }, []);

  const resetOrdersState = useCallback(() => {
    setIsErrorOrders(false);
  }, []);

  return {
    orders,
    isLoadingOrders,
    isErrorOrders,
    handleGetOrders,
    resetOrdersState
  };
};