import { ChangeEventHandler, SyntheticEvent } from "react";
import {
  Toolbar as BaseToolbar,
  Calendar,
  InputSwitch,
  InputText,
} from "@/components";
import { ThemeVariant } from "@/types";
import { FormEvent } from "primereact/ts-helpers";
import { locale, addLocale } from "primereact/api";
import styles from "./toolbar.module.scss";

export function Toolbar({
  theme,
  date,
  checked,
  onChangeDate,
  onSwitch,
  onChangeFilter,
  filterValue,
}: {
  theme: ThemeVariant;
  date: Date;
  checked: boolean;
  onChangeDate: (
    event: FormEvent<Date, SyntheticEvent<Element, Event>>,
  ) => void;
  onSwitch: () => void;
  onChangeFilter: ChangeEventHandler<HTMLInputElement>;
  filterValue?: string;
}) {
  locale("ru");
  addLocale("ru", { firstDayOfWeek: 1 });

  return (
    <BaseToolbar
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
              placeholder="Поиск по заказчику"
              value={filterValue}
              onChange={onChangeFilter}
            />
          </span>
        </div>
      }
      end={
        <div className={styles["toolbar__order-show"]}>
          <div>Отображение выполненных заказов:</div>
          <InputSwitch id="switch" checked={checked} onChange={onSwitch} />
        </div>
      }
    />
  );
}
