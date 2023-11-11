import { OrderType } from "@/types";

export default function doneBodyTemplate(order: OrderType, mode: "ready" | "done") {
  return <div>{order[mode] ? "Да" : "Нет"}</div>;
}