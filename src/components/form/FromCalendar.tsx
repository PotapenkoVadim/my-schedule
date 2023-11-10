import { Calendar, CalendarProps } from "primereact/calendar";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.scss";

const FormCalendar = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
  ...props
}: {
  control: Control<T, any>;
  name: Path<T>;
  label?: string;
} & CalendarProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <span className={cn("p-float-label", styles.form__field, className)}>
          <Calendar
            className={styles["form__field-content"]}
            value={field.value}
            onChange={(e) => field.onChange(e.target.value as PathValue<T, Path<T>>)}
            locale="ru"
            dateFormat="dd.mm.yy"
            selectionMode="range"
            readOnlyInput
            {...props}
          />
          <label>{label}</label>
        </span>
      )}
  />
  );
};

export default FormCalendar;
