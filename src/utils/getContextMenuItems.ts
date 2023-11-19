import { MenuItem } from "@/components";

export const getContextMenuItems = (
  onAdd: () => void,
  onEdit: () => void,
  onDone: () => void,
  onDelete: () => void,
  onReady: () => void,
  ): Array<MenuItem> => {
  return [
    { label: "Новый заказ", icon: "pi pi-fw pi-plus", command: onAdd },
    { label: "Редактировать", icon: "pi pi-fw pi-pencil", command: onEdit },
    { label: "Готово", icon: "pi pi-fw pi-check", command: onReady },
    { label: "Сдан", icon: "pi pi-fw pi-dollar", command: onDone },
    { label: "Удалить", icon: "pi pi-fw pi-trash", command: onDelete }
  ];
};