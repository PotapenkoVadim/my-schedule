import { SyntheticEvent } from "react";
import { DataTable, Column, DataTableFilterMeta, DataTableRowEvent } from "@/components";
import { OrderType, ThemeVariant } from "@/types";
import {
  colorBodyTemplate,
  dateBodyTemplate,
  detailsBodyTemplate,
  doneBodyTemplate,
  sumBodyTemplate
} from "./templates";
import styles from "./Table.module.scss";

export default function AccountTable({
  theme,
  data,
  filters,
  onContextClick
}: {
  theme: ThemeVariant;
  data?: Array<OrderType>;
  filters: DataTableFilterMeta;
  onContextClick: (e: SyntheticEvent<Element, Event>, order?: OrderType) => void;
}) {
  const handleContextClick = (event: DataTableRowEvent) => {
    onContextClick(event.originalEvent, event.data);
  };

  return (
    <DataTable
      paginator
      rows={15}
      selectionMode="single"
      data-theme={theme}
      value={data}
      className={styles["table"]}
      emptyMessage="Не найдено подходящего заказа."
      globalFilterFields={["customer", "set"]}
      filters={filters}
      onContextMenu={handleContextClick}
    >
      <Column field="color" body={colorBodyTemplate} />
      <Column sortable  field="customer" header="Заказчик" />
      <Column sortable  field="set" header="Фотосет" />
      <Column sortable  field="deadline" header="Дедлайн" body={dateBodyTemplate} />
      <Column header="Детализация" body={detailsBodyTemplate} />
      <Column header="Стоимость" body={sumBodyTemplate} />
      <Column sortable  field="comment" header="Коментарий" />
      <Column header="Выполнено" body={doneBodyTemplate} />
    </DataTable>
  );
}