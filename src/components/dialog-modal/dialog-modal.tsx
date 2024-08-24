import { Dialog, Button } from "@/components";
import styles from "./dialog-modal.module.scss";

export function DialogModal({
  title,
  isOpen,
  onClose,
  onSuccess,
  isLoading,
}: {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  isLoading?: boolean;
}) {
  return (
    <Dialog
      visible={isOpen}
      onHide={onClose}
      header={title}
      className={styles.dialog}
    >
      <div className={styles.dialog__buttons}>
        <Button
          loading={isLoading}
          onClick={onSuccess}
          className={styles.dialog__button}
        >
          Подтвердить
        </Button>

        <Button
          onClick={onClose}
          severity="danger"
          outlined
          className={styles.dialog__button}
        >
          Отмена
        </Button>
      </div>
    </Dialog>
  );
}
