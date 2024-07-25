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
        <Button loading={isLoading} onClick={onSuccess}>
          Подтвердить
        </Button>

        <Button onClick={onClose} severity="danger" outlined>
          Отмена
        </Button>
      </div>
    </Dialog>
  );
}
