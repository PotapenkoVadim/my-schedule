import { OrderType } from "@/types";
import format from "date-fns/format";
import {ru} from "date-fns/locale";

export default function dateBodyTemplate(order: OrderType) {
  const dateString = order?.deadline?.map(item => (
    format(new Date(item), "dd.MM.yyyy", {locale: ru})
  )).join(" - ");

  return <div>{dateString ?? "-"}</div>;
} 