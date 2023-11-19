import { OrderType } from "@/types";
import styles from "../Table.module.scss";

export default function colorBodyTemplate(order: OrderType) {
  return <div className={styles["table__color"]} style={{background: `#${order.color}`}} />;
}