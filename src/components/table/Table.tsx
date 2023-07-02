import {format} from "date-fns";
import {ru} from "date-fns/locale";
import { Order } from "../../interfacies";
import { OrderDetailsType } from "../../types";
import List from "../list/List";
import styles from "./Table.module.scss";
import TableActions from "./_Actions";

export default function Table({
  orders,
  onRemoveOrder,
  onEditOrder,
  onDoneOrder
}: {
  orders: Array<Order>;
  onRemoveOrder: (order: Order) => void;
  onEditOrder: (order: Order) => void;
  onDoneOrder: (order: Order) => void;
}) {
  const calculateDetails = (orderDetails: Array<OrderDetailsType>, type: "count" | "sum") => (
    orderDetails.reduce((acc, o) => acc + Number(o[type] ?? 0), 0)
  );

  const toFormat = (date: Date) => format(date as Date, "d.MM.yyyy", {locale: ru});
  const getDateText = (dates?: Array<string>) => dates ? dates
    .map(d => new Date(d))
    .filter(v => Boolean(v))
    .map(d => toFormat(d))
    .join(" - ") : "";

  let content;
  if (orders.length > 0) {
    content = orders.map(item => (
      <tr key={item.id}>
        <td className={styles["table__cell"]}>
          <div className={styles["table__color"]} style={{ background: `#${item.color}`}} />
        </td>
        <td className={styles["table__cell"]}>{item.customer}</td>
        <td className={styles["table__cell"]}>{item.set}</td>
        <td className={styles["table__cell"]}>
          {getDateText(item.deadline)}
        </td>
        <td className={styles["table__cell"]}>
          {item.details && item.details?.length > 0 && ([
            <List key="countList" items={item.details.map(x => `${x.count ?? 0} ${x.description ?? ""}`)} />,
            <div key="countRes">Общее количество: {calculateDetails(item.details, "count")}</div>

          ])}
        </td>
        <td className={styles["table__cell"]}>
          {item.details && item.details?.length > 0 && ([
            <List key="sumList" items={item.details.map(x => x.sum)} />,
            <div key="sumRes">Итого: {calculateDetails(item.details, "sum")}</div>
          ])}
        </td>
        <td className={styles["table__cell"]}>{item.comment}</td>
        <td className={styles["table__cell"]}>
          <TableActions
            isDone={item.done}
            onRemove={() => onRemoveOrder(item)}
            onEdit={() => onEditOrder(item)}
            onDone={() => onDoneOrder(item)}
          />
        </td>
      </tr>
    ));
  } else {
    content = (
      <tr>
        <td>
          <span className={styles["table__notice"]}>Нет заказов</span>
        </td>
      </tr>
    );
  }

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
              {content}
            </tbody>
          </table>
      </div>
    </section>
  );
}