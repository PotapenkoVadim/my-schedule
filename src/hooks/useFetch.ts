import { useCallback, useState } from "react";

type FetchOptions<TR, TQ extends unknown[]> = {
  queryFn?: (...args: TQ) => Promise<TR>;
  onSuccess?: (response?: TR) => Promise<void> | void;
  onError?: (error?: Error) => Promise<void> | void;
};

export const useFetch = <TR, TQ extends unknown[]>({
  queryFn,
  onError,
  onSuccess,
}: FetchOptions<TR, TQ>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleFetch = useCallback(
    async (...args: TQ) => {
      try {
        setIsLoading(true);

        const response = await queryFn?.(...args);
        if (onSuccess) await onSuccess(response);
      } catch (error) {
        setIsError(true);
        if (onError) await onError(error as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [queryFn, onSuccess, onError],
  );

  return {
    isLoading,
    isError,
    handleFetch,
  };
};
