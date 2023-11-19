import { deleteOrder } from "@/services";
import { RequestDeleteOrderType } from "@/types";
import { useCallback, useState } from "react";

export const useDeleteOrder = () => {
  const [isLoadingDeleteOrder, setIsLoadingDeleteOrder] = useState(false);
  const [isErrorDeleteOrder, setIsErrorDeleteOrder] = useState(false);

  const handleDeleteOrder = useCallback(async (data: RequestDeleteOrderType) => {
    setIsLoadingDeleteOrder(true);

    try {
      await deleteOrder(data);
    } catch (error) {
      setIsErrorDeleteOrder(true);
    } finally {
      setIsLoadingDeleteOrder(false);
    }
  }, []);

  const resetDeleteOrderState = useCallback(() => {
    setIsErrorDeleteOrder(false);
  }, []);

  return {
    isLoadingDeleteOrder,
    isErrorDeleteOrder,
    handleDeleteOrder,
    resetDeleteOrderState
  };
};