import { ListItems } from "@/components";
import { OrderEntity } from "@/interfaces";
import { calculateDetails } from "@/utils";

export function detailsBodyTemplate(order: OrderEntity) {
  const details = order.details?.map(
    (item) => `${item.count ?? 0} ${item.description ?? ""}`,
  );

  return (
    <div>
      <ListItems items={details} />
      <div key="countRes">
        Общее количество: {calculateDetails("count", order.details)}
      </div>
    </div>
  );
}
