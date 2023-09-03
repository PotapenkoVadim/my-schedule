import { DataTable, Column } from "@/components";
import { OrderType, ThemeVariant } from "@/types";
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
      <Column field="color" header="Color"></Column>
      <Column field="customer" header="Заказчик"></Column>
      <Column field="set" header="Фотосет"></Column>
      <Column field="deadline" header="Дедлайн"></Column>
      <Column header="Стоимость"></Column>
      <Column field="comment" header="Коментарий"></Column>
      <Column header="ACTIONS"></Column>
    </DataTable>
  );
}