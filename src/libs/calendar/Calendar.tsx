import cn from "classnames";
import { Button, Icon } from "../../components";
import { ButtonVariant, IconSize, IconVariant } from "../../enums";
import styles from "./Calendar.module.scss";
import { getBackgroundColor, getBorderColor, getDaysByWeeksOfYear, getTextColor } from "./utils";
import { MONTHS, WEEKS } from "./consts";
import { Order } from "../../interfacies";

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
    const findedOrder = orders?.find(item => {
      if (item.deadline && date) {
        const start = item.deadline[0];
        const end = item.deadline[1] ?? item.deadline[0];
  
        if (date >= new Date(start) && date <= new Date(end)) return true;
      }
  
      return false;
    });

    if (findedOrder) {
      onClick(findedOrder.id!);
    }
  };

  return (
    <div className={styles["calendar"]}>
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
                      ])} >
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