import { DataTable, Column } from "@/components";
import { OrderType, ThemeVariant } from "@/types";
import {
  colorBodyTemplate,
  dateBodyTemplate,
  detailsBodyTemplate,
  sumBodyTemplate
} from "./templates";
import styles from "./Table.module.scss";

export default function AccountTable({
  theme,
  data
}: {
  theme: ThemeVariant;
  data?: Array<OrderType>;
}) {
  return (
    <DataTable data-theme={theme} value={data} className={styles["table"]}>
      <Column field="color" body={colorBodyTemplate} />
      <Column field="customer" header="Заказчик" />
      <Column field="set" header="Фотосет"></Column>
      <Column field="deadline" header="Дедлайн" body={dateBodyTemplate} />
      <Column header="Детализация" body={detailsBodyTemplate} />
      <Column header="Стоимость" body={sumBodyTemplate} />
      <Column field="comment" header="Коментарий" />
      <Column header="ACTIONS" />
    </DataTable>
  );
}