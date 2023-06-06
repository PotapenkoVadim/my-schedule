import { Order } from "../../interfacies";
import { OrderDetailsType } from "../../types";
import List from "../list/List";
import styles from "./Table.module.scss";
import TableActions from "./_Actions";

export default function Table({ orders }: { orders: Array<Order>}) {
  const calculateDetails = (orderDetails: Array<OrderDetailsType>, type: "count" | "sum") => (
    orderDetails.reduce((acc, o) => acc + o[type], 0)
  );

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
                <th className={styles["table__head"]}>Комментарий</th>
                <th className={styles["table__head"]}></th>
              </tr>
            </thead>
            <tbody className={styles["table__content"]}>
              {orders.map(item => (
                <tr key={item.id}>
                  <td className={styles["table__cell"]}>{item.color}</td>
                  <td className={styles["table__cell"]}>{item.customer}</td>
                  <td className={styles["table__cell"]}>{item.set}</td>
                  <td className={styles["table__cell"]}>05.05.2023 - 10.05.2023</td>
                  <td className={styles["table__cell"]}>
                    <List items={item.details.map(x => x.description)} />
                    <div>Общее количество: {calculateDetails(item.details, "count")}</div>
                  </td>
                  <td className={styles["table__cell"]}>
                    <List items={item.details.map(x => x.sum)} />
                    <div>Итого: {calculateDetails(item.details, "sum")}</div>
                  </td>
                  <td className={styles["table__cell"]}>{item.comment}</td>
                  <td className={styles["table__cell"]}>
                    <TableActions />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </section>
  );
}