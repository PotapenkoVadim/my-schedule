import { ListItems } from "@/components";
import { OrderType } from "@/types";
import { calculateDetails } from "@/views/AccountTable/utils";

export default function sumBodyTemplate(order: OrderType) {
  const sum = order.details?.map(item => item.sum);

  return (
    <div>
      <ListItems items={sum} />
      <div>Итого: {calculateDetails("sum", order.details)}</div>
    </div>
  );
}