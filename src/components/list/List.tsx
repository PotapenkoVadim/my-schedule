import { ReactNode } from "react";
import styles from "./List.module.scss";

export default function List({ items }: { items: Array<ReactNode> }) {
  return (
    <ul className={styles["list"]}>
      {items.length > 0 && items.map((item, index) => (
        <li key={index} className={styles["list__item"]}>
          {item ?? "данные не указаны"}
        </li>
      ))}
    </ul>
  );
}