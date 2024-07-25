import { OrderEntity } from "@/interfaces";

export function doneBodyTemplate(order: OrderEntity, mode: "Ready" | "Done") {
  return <div>{order.status === mode ? "Да" : "Нет"}</div>;
}
