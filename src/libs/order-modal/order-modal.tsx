import { OrderEntity } from "@/interfaces";
import { Dialog } from "@/components";
import { OrderFormType } from "@/types";
import { OrderForm } from "../order-form/order-form";

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
    <Dialog visible={isOpen} onHide={onClose} header={title} draggable={false}>
      <OrderForm
        order={order}
        onSubmit={onSubmit}
        isLoading={isLoading}
        ctxDate={ctxDate}
      />
    </Dialog>
  );
}
