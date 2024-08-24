import { Column, DataTable, DataTableFilterMeta } from "@/components";
import { ThemeVariant } from "@/types";
import { OrderEntity } from "@/interfaces";
import {
  colorBodyTemplate,
  dateBodyTemplate,
  detailsBodyTemplate,
  doneBodyTemplate,
  sumBodyTemplate,
} from "./templates";

export function Table({
  theme,
  data,
  filters,
  isLoading,
}: {
  theme: ThemeVariant;
  data?: Array<OrderEntity>;
  filters: DataTableFilterMeta;
  isLoading: boolean;
}) {
  return (
    <DataTable
      paginator
      rows={15}
      selectionMode="single"
      data-theme={theme}
      value={data}
      emptyMessage="Не найдено подходящего заказа."
      globalFilterFields={["customer", "photoSet"]}
      filters={filters}
      loading={isLoading}
    >
      <Column field="color" body={colorBodyTemplate} />
      <Column sortable field="customer" header="Заказчик" />
      <Column sortable field="photoSet" header="Фотосет" />
      <Column
        sortable
        field="deadline"
        header="Дедлайн"
        body={dateBodyTemplate}
      />
      <Column header="Детализация" body={detailsBodyTemplate} />
      <Column header="Стоимость" body={sumBodyTemplate} />
      <Column sortable field="comment" header="Комментарий" />
      <Column
        header="Готов"
        body={(order) => doneBodyTemplate(order, "Ready")}
      />
      <Column header="Сдан" body={(order) => doneBodyTemplate(order, "Done")} />
    </DataTable>
  );
}
