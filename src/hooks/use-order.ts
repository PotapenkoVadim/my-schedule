import {
  addOrderService,
  deleteOrderService,
  editOrderService,
  getOrdersService,
} from "@/services";
import { OrderListEntity } from "@/interfaces";
import { useOrderStore } from "@/stores/order";
import { useFetch } from "./use-fetch";

export const useOrder = ({
  onSuccess,
  onError,
}: {
  onSuccess: () => void;
  onError: () => void;
}) => {
  const [orderList, setOrderList] = useOrderStore(
    ({ orderList, setOrderList }) => [orderList, setOrderList],
  );

  const handleSuccess = (response?: OrderListEntity) => {
    setOrderList(response || null);
    onSuccess();
  };

  const {
    handleFetch: addOrder,
    isError: isAddOrderError,
    isLoading: isAddOrderLoading,
  } = useFetch({
    queryFn: addOrderService,
    onSuccess: handleSuccess,
    onError,
  });

  const {
    handleFetch: editOrder,
    isError: isEditOrderError,
    isLoading: isEditOrderLoading,
  } = useFetch({
    queryFn: editOrderService,
    onSuccess: handleSuccess,
    onError,
  });

  const {
    handleFetch: deleteOrder,
    isError: isDeleteOrderError,
    isLoading: isDeleteOrderLoading,
  } = useFetch({
    queryFn: deleteOrderService,
    onSuccess: handleSuccess,
    onError,
  });

  const { handleFetch: getOrders, isLoading: isGetOrdersLoading } = useFetch({
    queryFn: getOrdersService,
    onSuccess: handleSuccess,
    onError,
  });

  const isLoading =
    isAddOrderLoading || isEditOrderLoading || isDeleteOrderLoading;
  const isError = isAddOrderError || isEditOrderError || isDeleteOrderError;

  return {
    orderList,
    addOrder,
    editOrder,
    deleteOrder,
    getOrders,
    isLoading,
    isError,
    isGetOrdersLoading,
  };
};
