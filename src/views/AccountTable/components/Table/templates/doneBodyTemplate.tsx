import { OrderType } from "@/types";

export default function doneBodyTemplate(order: OrderType) {
  return <div>{order.done ? "Да" : "Нет"}</div>;
}