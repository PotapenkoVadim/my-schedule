import { OrderEntity } from "@/interfaces";
import { Dialog } from "@/components";
import { OrderFormType } from "@/types";
import { OrderForm } from "../order-form/order-form";
import styles from "./order-modal.module.scss";

export function OrderModal({
  isOpen,
  isLoading,
  order,
  onClose,
  onSubmit,
  ctxDate,
}: {
  isOpen: boolean;
  isLoading?: boolean;
  order?: OrderEntity;
  onClose: () => void;
  onSubmit: (data: OrderFormType) => void;
  ctxDate?: Date;
}) {
  const title = order ? "Редактировать" : "Создать";

  return (
    <Dialog
      className={styles.modal}
      visible={isOpen}
      onHide={onClose}
      header={title}
    >
      <OrderForm
        order={order}
        onSubmit={onSubmit}
        isLoading={isLoading}
        ctxDate={ctxDate}
      />
    </Dialog>
  );
}
