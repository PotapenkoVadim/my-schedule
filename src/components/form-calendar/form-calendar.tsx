"use client";

import classnames from "classnames";
import { Calendar, CalendarProps } from "primereact/calendar";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { locale, addLocale } from "primereact/api";
import { FormError } from "../form-error/form-error";
import styles from "./form-calendar.module.scss";

export function FormCalendar<T extends FieldValues = FieldValues>({
  control,
  name,
  error,
  className,
  label,
}: {
  control: Control<T, any>;
  name: Path<T>;
  error?: string;
  label?: string;
} & CalendarProps) {
  locale("ru");
  addLocale("ru", { firstDayOfWeek: 1 });

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div
          className={classnames("p-float-label", styles.calendar, className)}
        >
          <Calendar
            value={field.value}
            onChange={(e) => field.onChange(e.value as PathValue<T, Path<T>>)}
            locale="ru"
            dateFormat="dd.mm.yy"
            selectionMode="range"
            readOnlyInput
            hideOnRangeSelection
          />
          <label>{label}</label>
          <FormError error={error} />
        </div>
      )}
    />
  );
}
