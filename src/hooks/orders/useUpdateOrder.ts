import { updateOrder } from "@/services";
import { RequestUpdateOrderType } from "@/types";
import { useCallback, useState } from "react";

export const useUpdateOrder = () => {
  const [isLoadingUpdateOrder, setIsLoadingUpdateOrder] = useState(false);
  const [isErrorUpdateOrder, setIsErrorUpdateOrder] = useState(false);

  const handleUpdateOrder = useCallback(async (data: RequestUpdateOrderType) => {
    setIsLoadingUpdateOrder(true);

    try {
      await updateOrder(data);
    } catch (error) {
      setIsErrorUpdateOrder(true);
    } finally {
      setIsLoadingUpdateOrder(false);
    }
  }, []);

  const resetUpdateOrderState = useCallback(() => {
    setIsErrorUpdateOrder(false);
  }, []);

  return {
    isLoadingUpdateOrder,
    isErrorUpdateOrder,
    resetUpdateOrderState,
    handleUpdateOrder
  };
};