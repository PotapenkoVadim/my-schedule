import { ListItems } from "@/components";
import { OrderEntity } from "@/interfaces";
import { calculateDetails } from "@/utils";

export function sumBodyTemplate(order: OrderEntity) {
  const sum = order.details?.map((item) => item.sum);

  return (
    <div>
      <ListItems items={sum} />
      <div>Итого: {calculateDetails("sum", order.details)}</div>
    </div>
  );
}
