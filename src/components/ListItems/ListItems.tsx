import styles from "./ListItems.module.scss";

export default function ListItems({items}: {items?: Array<string | number>}) {
  return (
    <ul className={styles["list"]}>
      {items && items.length > 0 && items.map((item, index) => (
        <li key={index} className={styles["list__item"]}>
          {item ?? "данные не указаны"}
        </li>
      ))}
    </ul>
  );
}