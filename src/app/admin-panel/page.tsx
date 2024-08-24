"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useSession, useUsers } from "@/hooks";
import { DELETE_USER_TEXT, PATHS, WENT_WRONG_ERROR } from "@/constants";
import {
  Button,
  DialogModal,
  PageContent,
  Spinner,
  UserList,
} from "@/components";
import { UserModal } from "@/libs";
import { UserEntity } from "@/interfaces";
import { UserFormType } from "@/types";
import { isAdmin } from "@/utils";
import { withPrivateRoute } from "@/hoc";
import styles from "./page.module.scss";

function AdminPanel() {
  const router = useRouter();
  const { theme, showToast } = useAppContext();

  const onError = () => showToast("error", WENT_WRONG_ERROR);

  const [isOpenUserModal, setIsOpenUserModal] = useState(false);
  const [editedUser, setEditedUser] = useState<UserEntity>();
  const [deletedUser, setDeletedUser] = useState<number>();
  const { currentUser, isSessionLoading, isSessionError, signOut } =
    useSession(onError);

  const closeDeleteModal = () => setDeletedUser(undefined);
  const openUserModal = () => setIsOpenUserModal(true);
  const closeUserModal = () => {
    setEditedUser(undefined);
    setIsOpenUserModal(false);
  };

  const {
    getUsers,
    deleteUser,
    addUser,
    editUser,
    isAddLoading,
    isEditLoading,
    isLoading,
    users,
  } = useUsers({
    onSuccess: () => {
      setDeletedUser(undefined);
      closeUserModal();
    },
    onError,
  });

  const handleDeleteUser = () => deleteUser(deletedUser);
  const handleEditUser = (id: number) => {
    const user = users?.find((item) => item.id === id);

    setEditedUser(user);
    openUserModal();
  };

  const handleSignOut = () => {
    signOut();
    router.push(PATHS.home);
  };

  const submit = (data: UserFormType) => {
    if (editedUser) editUser(editedUser.id, data);
    else addUser(data);
  };

  useEffect(() => {
    if (currentUser && isAdmin(currentUser)) {
      getUsers();
    }
  }, [currentUser]);

  let content;
  if (isSessionLoading || (!currentUser && !isSessionError)) {
    content = <Spinner isPage />;
  } else {
    content = (
      <>
        <UserList
          currentUser={currentUser}
          users={users}
          onDelete={setDeletedUser}
          onEdit={handleEditUser}
          onLogOut={handleSignOut}
        />

        <Button onClick={openUserModal} className={styles.page__button}>
          Добавить нового пользователя
        </Button>

        <DialogModal
          isOpen={Boolean(deletedUser)}
          isLoading={isLoading}
          onClose={closeDeleteModal}
          title={DELETE_USER_TEXT}
          onSuccess={handleDeleteUser}
        />

        <UserModal
          isOpen={isOpenUserModal}
          onClose={closeUserModal}
          user={editedUser}
          onSubmit={submit}
          isLoading={isAddLoading || isEditLoading}
        />
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      <PageContent>{content}</PageContent>
    </main>
  );
}

export default withPrivateRoute(AdminPanel, "onlyAdmin");
