import { Calendar, CalendarChangeEvent, CalendarProps } from "primereact/calendar";
import { addLocale } from "primereact/api";
import cn from "classnames";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import styles from "./DatePeriod.module.scss";

addLocale("ru", {firstDayOfWeek: 1});

type onChangeType = (event: CalendarChangeEvent) => void;

export default function DatePeriod<T extends FieldValues = FieldValues>({
  name,
  control,
  placeholder,
  error,
  className,
  minDate
}: {
  control: Control<T, any>;
  name: Path<T>;
  error?: string;
  minDate?: Date;
} & CalendarProps) {
  const getValue = (value: Array<string>): Array<Date> => {
    return value && value.length > 0
      ? value.map((d: string) => d ? new Date(d) : null).filter(item => item !== null) as Array<Date>
      : [];
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <label className={cn(styles["dateperiod"], {[className!]: Boolean(className)})}>
          <Calendar
            locale="ru"
            minDate={minDate}
            className={styles["dateperiod__field"]}
            dateFormat="dd.mm.yy"
            name={field.name}
            onChange={field.onChange as onChangeType}
            value={getValue(field.value)}
            selectionMode="range"
            readOnlyInput />

          <span className={cn([
            styles["dateperiod__label"],
            {[styles["dateperiod__label_active"]]: field.value.length > 0}
          ])}>
            {placeholder}
          </span>

          {error && (
            <span className={styles["formfield__error"]}>{error}</span>
          )}
        </label>
      )}
    />
  );
}