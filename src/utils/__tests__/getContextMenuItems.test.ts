import { getContextMenuItems } from "../getContextMenuItems";
import { vi } from "vitest";

const onAdd = vi.fn();
const onEdit = vi.fn();
const onDone = vi.fn();
const onDelete = vi.fn();
const onReady = vi.fn();

describe("getContextMenuItems", () => {
  it("should return default values", () => {
    const result = getContextMenuItems(onAdd, onEdit, onDone, onDelete, onReady);

    expect(result).toStrictEqual([
      { label: "Новый заказ", icon: "pi pi-fw pi-plus", command: onAdd },
      { label: "Редактировать", icon: "pi pi-fw pi-pencil", command: onEdit },
      { label: "Готово", icon: "pi pi-fw pi-check", command: onReady },
      { label: "Сдан", icon: "pi pi-fw pi-dollar", command: onDone },
      { label: "Удалить", icon: "pi pi-fw pi-trash", command: onDelete }
    ]);
  });
});