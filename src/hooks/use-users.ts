import { useState } from "react";
import { UserEntity } from "@/interfaces";
import { deleteUserService, getUsersService } from "@/services";
import { useFetch } from "./use-fetch";

export const useUsers = ({
  onSuccess,
  onError,
}: {
  onSuccess?: () => void;
  onError: () => void;
}) => {
  const [users, setUsers] = useState<Array<UserEntity>>();

  const handleSuccess = (response?: Array<UserEntity>) => {
    setUsers(response || []);
    if (onSuccess) onSuccess();
  };

  const { handleFetch: getUsers, isLoading: isGetLoading } = useFetch({
    queryFn: getUsersService,
    onSuccess: handleSuccess,
    onError,
  });

  const { handleFetch: deleteUser, isLoading: isDeleteLoading } = useFetch({
    queryFn: deleteUserService,
    onSuccess: (response) => {
      setUsers((users) => users?.filter((item) => item.id === response?.id));
    },
    onError,
  });

  const isLoading = isGetLoading || isDeleteLoading;

  return {
    users,
    isLoading,
    getUsers,
    deleteUser,
  };
};
