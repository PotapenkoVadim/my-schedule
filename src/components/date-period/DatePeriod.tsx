import { Calendar, CalendarProps } from "primereact/calendar";
import cn from "classnames";
import { Controller, Control, Path, FieldValues } from "react-hook-form";
import styles from "./DatePeriod.module.scss";

export default function DatePeriod<T extends FieldValues = FieldValues>({
  name,
  control,
  placeholder,
  error,
  className
}: {
  control: Control<T, any>;
  name: Path<T>;
  error?: string;
} & CalendarProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <label className={cn(styles["dateperiod"], {[className!]: Boolean(className)})}>
          <Calendar
            className={styles["dateperiod__field"]}
            dateFormat="dd.mm.yy"
            name={field.name}
            onChange={field.onChange}
            value={field.value}
            selectionMode="range"
            readOnlyInput
          />

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