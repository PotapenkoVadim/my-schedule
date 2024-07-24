import {
  addOrderService,
  deleteOrderService,
  editOrderService,
} from "@/services";
import { OrderListEntity } from "@/interfaces";
import { useFetch } from "./use-fetch";

export const useOrder = ({
  onSuccess,
  onError,
}: {
  onSuccess: (response?: OrderListEntity) => void;
  onError: () => void;
}) => {
  const {
    handleFetch: addOrder,
    isError: isAddOrderError,
    isLoading: isAddOrderLoading,
  } = useFetch({
    queryFn: addOrderService,
    onSuccess,
    onError,
  });

  const {
    handleFetch: editOrder,
    isError: isEditOrderError,
    isLoading: isEditOrderLoading,
  } = useFetch({
    queryFn: editOrderService,
    onSuccess,
    onError,
  });

  const {
    handleFetch: deleteOrder,
    isError: isDeleteOrderError,
    isLoading: isDeleteOrderLoading,
  } = useFetch({
    queryFn: deleteOrderService,
    onSuccess,
    onError,
  });

  const isLoading =
    isAddOrderLoading || isEditOrderLoading || isDeleteOrderLoading;
  const isError = isAddOrderError || isEditOrderError || isDeleteOrderError;

  return {
    addOrder,
    editOrder,
    deleteOrder,
    isLoading,
    isError,
  };
};
