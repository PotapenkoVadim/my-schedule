import { ReactNode } from "react";
import styles from "./List.module.scss";

export default function List({ items }: { items: Array<ReactNode> }) {
  return (
    <ul className={styles["list"]}>
      {items.map((item, index) => (
        <li key={index} className={styles["list__item"]}>
          {item}
        </li>
      ))}
    </ul>
  );
}