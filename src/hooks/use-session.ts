import { useCallback } from "react";
import { getSessionService, signInService } from "@/services";
import { useUserStore } from "@/stores/user";
import { useOrderStore } from "@/stores/order";
import { setToken, removeToken } from "@/utils";
import { currentYear } from "@/constants";
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
    onError: removeToken,
  });

  const signOut = useCallback(() => {
    removeToken();
    removeUser();
    setOrderList(null);
  }, [setOrderList, removeUser]);

  const { isLoading: isSignInLoading, handleFetch: sigIn } = useFetch({
    queryFn: signInService,
    onSuccess: (response) => {
      if (!response) throw new Error();

      setToken(response.token);
      handleFetch(currentYear);
    },
    onError,
  });

  return {
    currentUser: user,
    setCurrentUser: setUser,
    removeCurrentUser: removeUser,
    signOut,
    sigIn,
    isSessionError: isError,
    isSessionLoading: isLoading,
    isSessionSuccess: isSuccess,
    isSignInLoading,
    getSession: handleFetch,
  };
};
