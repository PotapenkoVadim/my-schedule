import { OrderEntity } from "@/interfaces";

export function doneBodyTemplate(order: OrderEntity, mode: "Ready" | "Done") {
  const isDoneText = order.status === "Done" || order.status === mode;

  return <div>{isDoneText ? "Да" : "Нет"}</div>;
}
