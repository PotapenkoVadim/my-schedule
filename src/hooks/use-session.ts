import { getSessionService } from "@/services";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { useOrderStore } from "@/stores/order";
import { useFetch } from "./use-fetch";

export const useSession = () => {
  const [setOrderList] = useOrderStore(({ setOrderList }) => [setOrderList]);
  const [user, setUser, removeUser] = useUserStore(
    ({ user, setUser, removeUser }) => [user, setUser, removeUser],
  );

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
      handleFetch(new Date().getFullYear());
    }
  }, [user]);

  return {
    currentUser: user,
    setCurrentUser: setUser,
    removeCurrentUser: removeUser,
    isSessionError: isError,
    isSessionLoading: isLoading,
    isSessionSuccess: isSuccess,
  };
};
