import cn from "classnames";
import { Tooltip } from "primereact/tooltip";
import { Button, Icon } from "../../components";
import { ButtonVariant, IconSize, IconVariant } from "../../enums";
import { findOrderByDate, getBackgroundColor, getBorderColor, getDaysByWeeksOfYear, getTextColor } from "./utils";
import { MONTHS, WEEKS } from "./consts";
import { Order } from "../../interfacies";
import styles from "./Calendar.module.scss";

export default function Calendar({
  orders,
  year,
  onClick,
  onChangeYear 
}: {
  orders: Array<Order>
  year: number;
  onClick: (id: string) => void;
  onChangeYear: (newYear: number) => void;
}) {
  const dates = getDaysByWeeksOfYear(year);

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

  return (
    <div id="calendar" className={styles["calendar"]}>
      <div className={styles["calendar__toolbar"]}>
        <div>Год: {year}</div>
        <div>
          <Button data-testid="calendar-btn-left" onClick={setPrevYear} variant={ButtonVariant.ICON}>
            <Icon variant={IconVariant.ARROW_BACK} size={IconSize.SMALL}/>
          </Button>

          <Button data-testid="calendar-btn-right" onClick={setNextYear} variant={ButtonVariant.ICON}>
            <Icon variant={IconVariant.ARROW_FORWARD} size={IconSize.SMALL} />
          </Button>
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
                      data-pr-disabled={isDisabledDay(item)}
                      id="calendarDay"
                      onClick={() => handleDayClick(item)}
                      style={{
                        border: `1px solid ${getBorderColor(item, orders)}`,
                        background: getBackgroundColor(item, orders),
                        color: getTextColor(item, orders)
                      }}
                      key={index}
                      className={cn([
                        styles["calendar__day"],
                        { [styles["calendar__day_hover"]]: Boolean(item) }
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