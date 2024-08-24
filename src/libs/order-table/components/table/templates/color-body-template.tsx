import { OrderEntity } from "@/interfaces";
import styles from "../table.module.scss";

export function colorBodyTemplate(order: OrderEntity) {
  return (
    <div
      className={styles.table__color}
      style={{ background: `#${order.color}` }}
    />
  );
}
