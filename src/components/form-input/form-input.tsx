"use client";

import { Controller, Control, FieldValues } from "react-hook-form";
import classnames from "classnames";
import { InputText } from "primereact/inputtext";
import { FormError } from "../form-error/form-error";
import styles from "./form-input.module.scss";

export type FormInputProps<T extends FieldValues = FieldValues> =
  React.ComponentProps<typeof InputText> & {
    control: Control<T, any>;
    name: string;
    error?: string;
    label?: string;
  };

export function FormInput<T extends FieldValues = FieldValues>({
  control,
  name,
  error,
  className,
  label,
  ...other
}: FormInputProps<T>) {
  return (
    <div className={classnames("p-float-label", styles.input, className)}>
      <Controller
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={name}
        control={control}
        render={({ field }) => (
          <InputText {...field} value={field.value || ""} {...other} />
        )}
      />
      <label>{label}</label>
      <FormError error={error} />
    </div>
  );
}

export default FormInput;
