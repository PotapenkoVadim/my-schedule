"use client";

import classnames from "classnames";
import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";
import { FormError } from "../form-error/form-error";
import styles from "./form-number.module.scss";

export function FormNumber<T extends FieldValues = FieldValues>({
  control,
  name,
  error,
  label,
  ...props
}: {
  control: Control<T, any>;
  name: Path<T>;
  error?: string;
  label?: string;
} & InputNumberProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={classnames("p-float-label", styles.number)}>
          <InputNumber
            value={field.value}
            onChange={(e) => field.onChange(e.value as PathValue<T, Path<T>>)}
            locale="de-DE"
            {...props}
          />
          <label>{label}</label>
          <FormError error={error} />
        </div>
      )}
    />
  );
}
