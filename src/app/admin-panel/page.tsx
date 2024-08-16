"use client";

import { useEffect, useState } from "react";
import { useAppContext } from "@/context";
import { useRouter } from "next/navigation";
import { useSession, useUsers } from "@/hooks";
import { isAdmin } from "@/utils";
import { DELETE_USER_TEXT, PATHS, WENT_WRONG_ERROR } from "@/constants";
import { DialogModal, Spinner, UserList } from "@/components";
import styles from "./page.module.scss";

export default function AdminPanel() {
  const router = useRouter();
  const { theme, showToast } = useAppContext();

  const onError = () => showToast("error", WENT_WRONG_ERROR);

  const [deletedUser, setDeletedUser] = useState<number>();
  const { currentUser, isSessionLoading, isSessionError, singOut } =
    useSession(onError);

  if (!currentUser || (currentUser && !isAdmin(currentUser))) {
    router.push(PATHS.home);
  }

  const { getUsers, deleteUser, isLoading, users } = useUsers({
    onSuccess: () => setDeletedUser(undefined),
    onError,
  });

  const closeDeleteModal = () => setDeletedUser(undefined);
  const handleDeleteUser = () => deleteUser(deletedUser);
  const handleEditUser = (id: number) => console.log("EDIT USER: ", id);

  const handleSignOut = () => {
    singOut();
    router.push(PATHS.home);
  };

  useEffect(() => {
    if (currentUser) {
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

        <DialogModal
          isOpen={Boolean(deletedUser)}
          isLoading={isLoading}
          onClose={closeDeleteModal}
          title={DELETE_USER_TEXT}
          onSuccess={handleDeleteUser}
        />
      </>
    );
  }

  return (
    <main data-theme={theme} className={styles.page}>
      {content}
    </main>
  );
}
