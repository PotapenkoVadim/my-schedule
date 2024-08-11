import { getSessionService } from "@/services";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { useOrderStore } from "@/stores/order";
import { useFetch } from "./use-fetch";

export const useSession = () => {
  const [user, setUser] = useUserStore(({ user, setUser }) => [user, setUser]);
  const [setOrderList] = useOrderStore(({ setOrderList }) => [setOrderList]);

  const { handleFetch, isError, isLoading, isSuccess } = useFetch({
    queryFn: getSessionService,
    onSuccess: (response) => {
      if (!response) throw new Error();

      setUser(response);
      setOrderList(response?.orders || null);
    },
  });

  useEffect(() => {
    if (!user) {
      handleFetch();
    }
  }, [user]);

  return {
    isSessionError: isError,
    isSessionLoading: isLoading,
    isSessionSuccess: isSuccess,
  };
};
