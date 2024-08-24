import { OrderEntity } from "@/interfaces";
import { Dialog } from "@/components";
import { OrderFormType } from "@/types";
import { ADD_TEXT, EDIT_TEXT } from "@/constants";
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
  const title = order ? EDIT_TEXT : ADD_TEXT;

  return (
    <Dialog visible={isOpen} onHide={onClose} header={title}>
      <OrderForm
        order={order}
        onSubmit={onSubmit}
        isLoading={isLoading}
        ctxDate={ctxDate}
      />
    </Dialog>
  );
}
