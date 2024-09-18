import { MouseEvent } from "react";
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components";
import { ThemeVariant, UserScopes } from "@/types";
import { OrderEntity, UserEntity } from "@/interfaces";
import { hasPermission } from "@/utils";
import { PERMISSIONS } from "@/constants";
import {
  findOrderByDate,
  getBackgroundColor,
  getBorderColor,
  getDaysByWeeksOfYear,
  getTextColor,
} from "./utils";
import { MONTHS, WEEKS } from "./constants";
import { PermissionGuard } from "../permission-guard/permission-guard";
import styles from "./calendar.module.scss";

export function Calendar({
  orders,
  theme,
  year,
  user,
  onClick,
  onAddOrder,
  onChangeYear,
  onClickCtxMenu,
}: {
  orders?: Array<OrderEntity>;
  theme: ThemeVariant;
  user: UserEntity | null;
  year: number;
  onClick: (id?: number) => void;
  onAddOrder: () => void;
  onChangeYear: (year: number) => void;
  onClickCtxMenu?: (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    order?: OrderEntity,
    date?: Date | null,
  ) => void;
}) {
  const isLogIn = Boolean(user);
  const dates = getDaysByWeeksOfYear(year);
  const currentDate = new Date().toDateString();

  const setPrevYear = () => onChangeYear(year - 1);
  const setNextYear = () => onChangeYear(year + 1);

  const handleDayClick = (date: Date | null) => {
    const selectedOrder = findOrderByDate(date, orders);

    if (selectedOrder) {
      onClick(selectedOrder.id);
    }
  };

  const handleContextMenu = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
    date: Date | null,
  ) => {
    const order = findOrderByDate(date, orders);
    const permission = user?.role ? PERMISSIONS[user.role] : [];
    const isAllowed = hasPermission([UserScopes.allowOrder], permission);

    if (onClickCtxMenu && isLogIn && isAllowed) {
      e.preventDefault();
      onClickCtxMenu(e, order, date);
    }
  };

  const isDisabledDay = (date: Date | null) => {
    const order = findOrderByDate(date, orders);

    return !order;
  };

  const getTooltipText = (date: Date | null) => {
    const order = findOrderByDate(date, orders);

    if (order) {
      return `${order.customer}: ${order.photoSet}`;
    }
  };

  return (
    <div id="calendar" data-theme={theme} className={styles.calendar}>
      <div className={styles.calendar__toolbar}>
        <div className={styles.calendar__year}>Год: {year}</div>
        <div className={styles.calendar__buttons}>
          {isLogIn && (
            <PermissionGuard
              currentUser={user}
              scopes={[UserScopes.allowOrder]}
            >
              <Button onClick={onAddOrder} icon="pi pi-plus" />
            </PermissionGuard>
          )}

          <Button onClick={() => onClick()} icon="pi pi-table" />

          {isLogIn && (
            <>
              <Button onClick={setPrevYear} icon="pi pi-arrow-left" />
              <Button onClick={setNextYear} icon="pi pi-arrow-right" />
            </>
          )}
        </div>
      </div>

      <div className={styles.calendar__dates}>
        {dates.map((weeks, index) => (
          <div key={MONTHS[index]} className={styles.calendar__month}>
            <div className={styles["calendar__month-header"]}>
              {MONTHS[index]}
            </div>
            <div className={styles["calendar__month-content"]}>
              {weeks.map((days, index) => (
                <div key={WEEKS[index]} className={styles.calendar__week}>
                  <div className={styles.calendar__day}>{WEEKS[index]}</div>

                  {days.map((item) => (
                    <div
                      data-title={getTooltipText(item)}
                      onContextMenu={(e) => handleContextMenu(e, item)}
                      data-pr-disabled={isDisabledDay(item)}
                      onClick={() => handleDayClick(item)}
                      style={{
                        border: `1px solid ${getBorderColor(item, orders)}`,
                        background: getBackgroundColor(item, orders),
                        color: getTextColor(item, orders, theme),
                      }}
                      key={uuidv4()}
                      className={classnames([
                        styles.calendar__day,
                        {
                          [styles.calendar__day_hover]: Boolean(item),
                          [styles.calendar__day_active]:
                            item?.toDateString() === currentDate,
                        },
                      ])}
                    >
                      {item?.getDate()}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
