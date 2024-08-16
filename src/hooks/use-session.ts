import { getSessionService, signOutService } from "@/services";
import { useEffect } from "react";
import { useUserStore } from "@/stores/user";
import { useOrderStore } from "@/stores/order";
import { useFetch } from "./use-fetch";

export const useSession = (onError?: () => void) => {
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

  const { isLoading: isSignOutLoading, handleFetch: singOut } = useFetch({
    queryFn: signOutService,
    onSuccess: () => {
      removeUser();
      setOrderList(null);
    },
    onError,
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
    singOut,
    isSessionError: isError,
    isSessionLoading: isLoading || isSignOutLoading,
    isSessionSuccess: isSuccess,
  };
};
