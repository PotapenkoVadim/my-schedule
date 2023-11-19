import { ChangeEventHandler } from "react";
import { InputSwitch, Toolbar, Calendar, CalendarChangeEvent, InputText } from "@/components";
import { ThemeVariant } from "@/types";
import styles from "./Toolbar.module.scss";

export default function AccountTableToolbar({
  theme,
  date,
  checked,
  onChangeDate,
  onSwitch,
  onChangeFilter,
  filterValue
}: {
  theme: ThemeVariant;
  date: Date;
  checked: boolean;
  onChangeDate: (event: CalendarChangeEvent) => void;
  onSwitch: () => void;
  onChangeFilter: ChangeEventHandler<HTMLInputElement>;
  filterValue?: string
}) {
  return (
    <Toolbar
      className={styles["toolbar"]}
      data-theme={theme}
      start={
        <div className={styles.toolbar__fields}>
          <Calendar
            value={date}
            onChange={onChangeDate}
            dateFormat="yy"
            view="year"
            readOnlyInput
            showIcon
            locale="ru"
          />
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText
                placeholder="Найти заказ"
                value={filterValue}
                onChange={onChangeFilter}
              />
          </span>
        </div>
      }
      end={
        <div className={styles["toolbar__order-show"]}>
          <div>Отображение выполненых заказов:</div>
          <InputSwitch
            id="switch"
            checked={checked}
            onChange={onSwitch}
          />
        </div>
      }
    />
  );
}