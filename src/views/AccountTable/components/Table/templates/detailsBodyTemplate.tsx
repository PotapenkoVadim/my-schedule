import { ListItems } from "@/components";
import { OrderType } from "@/types";
import { calculateDetails } from "@/views/AccountTable/utils";

export default function detailsBodyTemplate(order: OrderType) {
  const details = order.details?.map(item => (
    `${item.count ?? 0} ${item.description ?? ""}`
  ));

  return (
    <div>
      <ListItems items={details} />
      <div key="countRes">Общее количество: {calculateDetails("count", order.details)}</div>
    </div>
  );
}