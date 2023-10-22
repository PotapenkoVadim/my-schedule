import { MouseEvent } from "react";
import cn from "classnames";
import { Button, Tooltip } from "@/components";
import { findOrderByDate, getBackgroundColor, getBorderColor, getDaysByWeeksOfYear, getTextColor } from "./utils";
import { MONTHS, WEEKS } from "./constants";
import { OrderType, ThemeVariant } from "@/types";
import styles from "./Calendar.module.scss";

export default function Calendar({
  orders,
  year,
  onClick,
  onChangeYear,
  onClickCtxMenu,
  theme
}: {
  orders?: Array<OrderType>
  year: number;
  onClick: (id: string) => void;
  onChangeYear: (newYear: number) => void;
  onClickCtxMenu?: (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, order?: OrderType) => void;
  theme?: ThemeVariant
}) {
  const dates = getDaysByWeeksOfYear(year);
  const currentDate = new Date().toDateString();

  const setPrevYear = () => onChangeYear(year - 1);
  const setNextYear = () => onChangeYear(year + 1);

  const handleDayClick = (date: Date | null) => {
    const findedOrder = findOrderByDate(date, orders);

    if (findedOrder) {
      onClick(findedOrder.id!);
    }
  };

  const isDisabledDay = (date: Date | null) => {
    const findedOrder = findOrderByDate(date, orders);

    return findedOrder ? false : true;
  };

  const getTooltipText = (date: Date | null) => {
    const findedOrder = findOrderByDate(date, orders);

    if (findedOrder) {
      return `${findedOrder.customer}: ${findedOrder.set}`;
    }
  };

  const handleContextMenu = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>, date: Date | null) => {
    const findedOrder = findOrderByDate(date, orders);

    if (onClickCtxMenu && findedOrder) {
      e.preventDefault();
  
      onClickCtxMenu(e, findedOrder);
    }
  };

  return (
    <div id="calendar" data-theme={theme} className={styles["calendar"]}>
      <div className={styles["calendar__toolbar"]}>
        <div className={styles["calendar__year"]}>Год: {year}</div>
        <div className={styles["calendar__buttons"]}>
          <Button onClick={setPrevYear} icon="pi pi-arrow-left" />
          <Button onClick={setNextYear} icon="pi pi-arrow-right" />
        </div>
      </div>

      <div className={styles["calendar__dates"]}>
        {dates.map((weeks, index) => (
          <div key={MONTHS[index]} className={styles["calendar__month"]}>
            <div className={styles["calendar__month-header"]}>{MONTHS[index]}</div>
            <div className={styles["calendar__month-content"]}>

              {weeks.map((days, index) => (
                <div key={WEEKS[index]} className={styles["calendar__week"]}>
                  <div className={styles["calendar__day"]}>{WEEKS[index]}</div>

                  {days.map((item, index) => (
                    <div
                      onContextMenu={(e) => handleContextMenu(e, item)}
                      data-pr-disabled={isDisabledDay(item)}
                      id="calendarDay"
                      onClick={() => handleDayClick(item)}
                      style={{
                        border: `1px solid ${getBorderColor(item, orders)}`,
                        background: getBackgroundColor(item, orders),
                        color: getTextColor(item, orders, theme)
                      }}
                      key={index}
                      className={cn([
                        styles["calendar__day"],
                        { 
                          [styles["calendar__day_hover"]]: Boolean(item),
                          [styles["calendar__day_active"]]: item?.toDateString() === currentDate
                        }
                      ])}
                      data-pr-tooltip={getTooltipText(item)}
                      data-pr-position="top"
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

      <Tooltip hideDelay={250} target={`.${styles["calendar__day"]}`} />
    </div>
  );
}