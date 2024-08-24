import { v4 as uuidv4 } from "uuid";
import styles from "./list-items.module.scss";

export function ListItems({ items }: { items?: Array<string | number> }) {
  return (
    <ul className={styles.list}>
      {items &&
        items.length > 0 &&
        items.map((item) => (
          <li key={uuidv4()} className={styles.list__item}>
            {item ?? "данные не указаны"}
          </li>
        ))}
    </ul>
  );
}
