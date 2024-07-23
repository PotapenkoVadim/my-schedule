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
  const [isSuccess, setIsSuccess] = useState<boolean>();

  const handleFetch = useCallback(
    async (...args: TQ) => {
      try {
        setIsLoading(true);
        setIsSuccess(undefined);

        const response = await queryFn?.(...args);
        if (onSuccess) await onSuccess(response);
        setIsSuccess(true);
      } catch (error) {
        setIsError(true);
        setIsSuccess(false);
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
    isSuccess,
    handleFetch,
  };
};
