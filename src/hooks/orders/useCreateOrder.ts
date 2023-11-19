import { createOrder } from "@/services";
import { RequestCreateOrderType } from "@/types";
import { useCallback, useState } from "react";

export const useCreateOrder = () => {
  const [isLoadingCreateOrder, setIsLoadingCreateOrder] = useState(false);
  const [isErrorCreateOrder, setIsErrorCreateOrder] = useState(false);

  const handleCreateOrder = useCallback(async (data: RequestCreateOrderType) => {
    setIsLoadingCreateOrder(true);

    try {
      await createOrder(data);
    } catch (error) {
      setIsErrorCreateOrder(true);
    } finally {
      setIsLoadingCreateOrder(false);
    }
  }, []);

  const resetCreateOrderState = useCallback(() => {
    setIsErrorCreateOrder(false);
  }, []);

  return {
    isLoadingCreateOrder,
    isErrorCreateOrder,
    handleCreateOrder,
    resetCreateOrderState
  };
};