import { Dialog } from "@/components";
import { UserEntity } from "@/interfaces";
import { UserFormType } from "@/types";
import { ADD_USER_TEXT, EDIT_USER_TEXT } from "@/constants";
import { UserForm } from "../user-form/user-form";

export function UserModal({
  isOpen,
  onClose,
  onSubmit,
  user,
  isLoading,
}: {
  isOpen: boolean;
  onClose: () => void;
  user?: UserEntity;
  onSubmit: (data: UserFormType) => void;
  isLoading: boolean;
}) {
  const title = user ? EDIT_USER_TEXT : ADD_USER_TEXT;

  return (
    <Dialog visible={isOpen} onHide={onClose} header={title}>
      <UserForm user={user} onSubmit={onSubmit} isLoading={isLoading} />
    </Dialog>
  );
}
