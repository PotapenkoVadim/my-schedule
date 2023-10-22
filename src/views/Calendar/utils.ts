import { MenuItem } from "@/components";

export const getContextMenuItems = (
  onEdit: () => void,
  onDone: () => void,
  onDelete: () => void
  ): Array<MenuItem> => {
  return [
    { label: "Редактировать", icon: "pi pi-fw pi-pencil", command: onEdit },
    { label: "Выполнено", icon: "pi pi-fw pi-check", command: onDone },
    { label: "Удалить", icon: "pi pi-fw pi-trash", command: onDelete }
  ];
};