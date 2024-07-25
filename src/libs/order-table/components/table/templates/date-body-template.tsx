import { OrderEntity } from "@/interfaces";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export function dateBodyTemplate(order: OrderEntity) {
  const dateString = order?.deadline
    ?.map((item) => format(new Date(item), "dd.MM.yyyy", { locale: ru }))
    .join(" - ");

  return <div>{dateString ?? "-"}</div>;
}
