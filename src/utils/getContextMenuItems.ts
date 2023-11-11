import { MenuItem } from "@/components";

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