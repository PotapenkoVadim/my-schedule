"use client";

import { Controller, Control, FieldValues } from "react-hook-form";
import classnames from "classnames";
import { Dropdown } from "primereact/dropdown";
import { FormError } from "../form-error/form-error";
import styles from "./form-select.module.scss";

export type FormSelectProps<T extends FieldValues = FieldValues> =
  React.ComponentProps<typeof Dropdown> & {
    control: Control<T, any>;
    name: string;
    error?: string;
    label?: string;
  };

export function FormSelect<T extends FieldValues = FieldValues>({
  control,
  name,
  error,
  className,
  label,
  ...other
}: FormSelectProps<T>) {
  return (
    <div className={classnames("p-float-label", styles.select, className)}>
      <Controller
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={name}
        control={control}
        render={({ field }) => (
          <Dropdown {...field} value={field.value || ""} {...other} />
        )}
      />
      <label>{label}</label>
      <FormError error={error} />
    </div>
  );
}
