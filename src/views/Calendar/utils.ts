import { MenuItem } from "@/components";
import { OrderDetailsType } from "@/types";
import { format } from "date-fns";

export const getContextMenuItems = (
  onAdd: () => void,
  onEdit: () => void,
  onDone: () => void,
  onDelete: () => void
  ): Array<MenuItem> => {
  return [
    { label: "Новый заказ", icon: "pi pi-fw pi-plus", command: onAdd },
    { label: "Редактировать", icon: "pi pi-fw pi-pencil", command: onEdit },
    { label: "Выполнено", icon: "pi pi-fw pi-check", command: onDone },
    { label: "Удалить", icon: "pi pi-fw pi-trash", command: onDelete }
  ];
};

export const formatDeadlineToServer = (deadline?: Array<Date>) => {
  return deadline?.filter(Boolean).map(item => format(item, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z"));
};

export const transformDetails = (details?: Array<OrderDetailsType>) => {
  return details?.map(item => ({...item, count: String(item.count), sum: String(item.sum)}));
};
