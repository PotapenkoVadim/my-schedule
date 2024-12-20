import { UserEntity } from "@/interfaces";
import { Button } from "primereact/button";
import styles from "./user-list.module.scss";

export function UserList({
  currentUser,
  users = [],
  onDelete,
  onEdit,
  onLogOut,
}: {
  currentUser: UserEntity | null;
  users?: Array<UserEntity>;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onLogOut: () => void;
}) {
  return (
    <>
      <div className={styles.list__title}>
        Список всех пользователей приложения:
      </div>

      {users.map(({ id, username, role, createdAt }) => (
        <div key={id} className={styles.list__item}>
          <div className="pi pi-user" />
          <div>{username}</div>
          <div>{role}</div>
          <div>{new Date(createdAt).toLocaleDateString()}</div>

          <div className={styles.list__buttons}>
            <Button
              className={styles.list__button}
              onClick={() => onEdit(id)}
              icon="pi pi-pencil"
            />

            {currentUser?.id !== id ? (
              <Button
                className={styles.list__button}
                onClick={() => onDelete(id)}
                icon="pi pi-times"
              />
            ) : (
              <Button
                className={styles.list__button}
                onClick={onLogOut}
                icon="pi pi-sign-out"
              />
            )}
          </div>
        </div>
      ))}
    </>
  );
}
