import { Dialog } from "@/components";
import { OrderForm } from "./components";
import { OrderFormType, OrderType } from "@/types";
import style from "./OrderModal.module.scss";

const OrderModal = ({
  isOpen,
  isLoading,
  order,
  onClose,
  onSubmit,
  ctxDate
}: {
  isOpen: boolean;
  isLoading?: boolean;
  order?: OrderType;
  onClose: () => void;
  onSubmit: (data: OrderFormType) => void;
  ctxDate?: Date;
}) => {
  const title = order ? "Редактировать" : "Создать";

  return (
    <Dialog
      className={style.modal}
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
};

export default OrderModal;
