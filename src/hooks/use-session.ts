import { getSessionService } from "@/services";
import { useLayoutEffect } from "react";
import { useUserStore } from "@/stores/user";
import { useFetch } from "./use-fetch";

export const useSession = () => {
  const [user, setUser] = useUserStore(({ user, setUser }) => [user, setUser]);

  const { handleFetch, isError, isLoading, isSuccess } = useFetch({
    queryFn: getSessionService,
    onSuccess: (response) => {
      if (!response) throw new Error();

      setUser(response);
    },
  });

  useLayoutEffect(() => {
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
