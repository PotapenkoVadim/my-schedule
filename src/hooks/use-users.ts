import { useState } from "react";
import { UserEntity } from "@/interfaces";
import {
  addUserService,
  deleteUserService,
  editUserService,
  getUsersService,
} from "@/services";
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
      setUsers((users) => users?.filter((item) => item.id !== response?.id));
      if (onSuccess) onSuccess();
    },
    onError,
  });

  const { handleFetch: addUser, isLoading: isAddLoading } = useFetch({
    queryFn: addUserService,
    onSuccess: (response) => {
      setUsers((users) => (users && response ? [...users, response] : users));
      if (onSuccess) onSuccess();
    },
    onError,
  });

  const { handleFetch: editUser, isLoading: isEditLoading } = useFetch({
    queryFn: editUserService,
    onSuccess: (response) => {
      setUsers((users) =>
        users?.map((item) => (item.id === response?.id ? response : item)),
      );
      if (onSuccess) onSuccess();
    },
    onError,
  });

  const isLoading = isGetLoading || isDeleteLoading;

  return {
    users,
    isLoading,
    isAddLoading,
    isEditLoading,
    getUsers,
    deleteUser,
    addUser,
    editUser,
  };
};
