import { InputSwitch, Toolbar, Calendar, CalendarChangeEvent } from "@/components";
import { DateRangeType, ThemeVariant } from "@/types";
import styles from "./Toolbar.module.scss";

export default function AccountTableToolbar({
  theme,
  dates,
  onChangeDate
}: {
  theme: ThemeVariant;
  dates: DateRangeType;
  onChangeDate: (event: CalendarChangeEvent) => void;
}) {
  return (
    <Toolbar
      className={styles["toolbar"]}
      data-theme={theme}
      start={
        <Calendar
          value={dates}
          selectionMode="range"
          onChange={onChangeDate}
          dateFormat="dd.mm.yy"
          readOnlyInput
          showIcon
          locale="ru"
        />
      }
      end={
        <div className={styles["toolbar__order-show"]}>
          <div>Отображение выполненых заказов:</div>
          <InputSwitch
            id="switch"
            checked
          />
        </div>
      }
    />
  );
}