"use client";

import classnames from "classnames";
import { Controller, Control, FieldValues } from "react-hook-form";
import { Password } from "primereact/password";
import { FormError } from "../form-error/form-error";
import styles from "./form-password.module.scss";

export type FormPasswordProps<T extends FieldValues = FieldValues> =
  React.ComponentProps<typeof Password> & {
    control: Control<T, any>;
    name: string;
    error?: string;
    label?: string;
  };

export function FormPassword<T extends FieldValues = FieldValues>(
  props: FormPasswordProps<T>,
) {
  const { control, name, label, error, ...other } = props;
  return (
    <div className={classnames("p-float-label", styles.password)}>
      <Controller
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={name}
        control={control}
        render={({ field }) => (
          <Password {...field} value={field.value || ""} {...other} />
        )}
      />
      <label>{label}</label>
      <FormError error={error} />
    </div>
  );
}

export default FormPassword;
