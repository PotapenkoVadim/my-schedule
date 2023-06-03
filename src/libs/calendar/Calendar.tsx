import cn from "classnames";
import { Button, Icon } from "../../components";
import { ButtonVariant, IconSize, IconVariant } from "../../enums";
import styles from "./Calendar.module.scss";
import { getDaysByWeeksOfYear } from "./utils";
import { MONTHS, WEEKS } from "./consts";

export default function Calendar({
  year,
  onChangeYear 
}: {
  year: number;
  onChangeYear: (newYear: number) => void;
}) {
  const dates = getDaysByWeeksOfYear(year);

  const setPrevYear = () => onChangeYear(year - 1);
  const setNextYear = () => onChangeYear(year + 1);

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
                    <div key={index} className={cn([
                      styles["calendar__day"],
                      { [styles["calendar__day_hover"]]: Boolean(item) }
                    ])}>
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