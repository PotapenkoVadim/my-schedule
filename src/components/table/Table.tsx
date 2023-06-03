import styles from "./Table.module.scss";

export default function Table() {
  return (
    <section className={styles["table"]}>
      <div className={styles["table__wrapper"]}>
          <table className={styles["table__table"]}>
            <thead className={styles["table__header"]}>
              <tr>
                <th className={styles["table__head"]}></th>
                <th className={styles["table__head"]}>Заказчик</th>
                <th className={styles["table__head"]}>Сет</th>
                <th className={styles["table__head"]}>Дедлайн</th>
                <th className={styles["table__head"]}>Детализация</th>
                <th className={styles["table__head"]}>Стоимость</th>
                <th className={styles["table__head"]}>Коментарий</th>
                <th className={styles["table__head"]}></th>
              </tr>
            </thead>
            <tbody className={styles["table__content"]}>
              <tr>
                <td className={styles["table__cell"]}>red</td>
                <td className={styles["table__cell"]}>Иванов-Залесский</td>
                <td className={styles["table__cell"]}>Genshin</td>
                <td className={styles["table__cell"]}>05.05.2023 - 10.05.2023</td>
                <td className={styles["table__cell"]}>
                  <ul>
                    <li>3 фото - краткое описание краткое описание краткое описание краткое описание краткое описание краткое описание краткое описание</li>
                    <li>3 фото - краткое описание краткое описание краткое описание</li>
                    <li>3 фото - краткое описание</li>
                  </ul>
                </td>
                <td className={styles["table__cell"]}>
                  <ul>
                    <li>100р</li>
                    <li>100р</li>
                    <li>100р</li>
                  </ul>
                  <div>Итого: 300р</div>
                </td>
                <td className={styles["table__cell"]}>Много фоток краткое описание краткое описание краткое описание краткое описание краткое описание</td>
                <td className={styles["table__cell"]}>-</td>
              </tr>
              <tr>
              <td className={styles["table__cell"]}>red</td>
                <td className={styles["table__cell"]}>Иванов-Залесский</td>
                <td className={styles["table__cell"]}>Genshin</td>
                <td className={styles["table__cell"]}>05.05.2023 - 10.05.2023</td>
                <td className={styles["table__cell"]}>
                  <ul>
                    <li>3 фото - краткое описание</li>
                    <li>3 фото - краткое описание</li>
                    <li>3 фото - краткое описание</li>
                  </ul>
                </td>
                <td className={styles["table__cell"]}>
                  <ul>
                    <li>100р</li>
                    <li>100р</li>
                    <li>100р</li>
                    <li>Итого: 300р</li>
                  </ul>
                </td>
                <td className={styles["table__cell"]}>Много фоток</td>
                <td className={styles["table__cell"]}>-</td>
              </tr>
              <tr>
              <td className={styles["table__cell"]}>red</td>
                <td className={styles["table__cell"]}>Иванов-Залесский</td>
                <td className={styles["table__cell"]}>Genshin</td>
                <td className={styles["table__cell"]}>05.05.2023 - 10.05.2023</td>
                <td className={styles["table__cell"]}>
                  <ul>
                    <li>3 фото - краткое описание</li>
                    <li>3 фото - краткое описание</li>
                    <li>3 фото - краткое описание</li>
                  </ul>
                </td>
                <td className={styles["table__cell"]}>
                  <ul>
                    <li>100р</li>
                    <li>100р</li>
                    <li>100р</li>
                    <li>Итого: 300р</li>
                  </ul>
                </td>
                <td className={styles["table__cell"]}>Много фоток</td>
                <td className={styles["table__cell"]}>-</td>
              </tr>
            </tbody>
          </table>
      </div>
    </section>
  );
}