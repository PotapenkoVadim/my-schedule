import { DataTable, Column } from "@/components";
import { ThemeVariant } from "@/types";
import styles from "./Table.module.scss";

export default function AccountTable({theme}: {theme: ThemeVariant}) {
  const orders = [{"id":"1688803205765","color":"000","customer":"czxcz","set":"zxczx","deadline":[],"comment":"","done":false,"details":[{"count":"1","description":"fssdfsd","sum":"3"}]},{"id":"1690894371169","color":"f508f5","customer":"Петров","set":"Бетмен","deadline":["2023-07-31T21:00:00.000Z","2023-08-03T21:00:00.000Z"],"comment":"Hello world","done":false,"details":[{"count":"5","description":"Batman","sum":"500"},{"count":"2","description":"Joker","sum":"200"}]}];

  return (
    <DataTable data-theme={theme} value={orders} className={styles["table"]}>
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