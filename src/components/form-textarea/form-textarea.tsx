"use client";

import classnames from "classnames";
import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import { FormError } from "../form-error/form-error";
import styles from "./form-textarea.module.scss";

export function FormTextarea<T extends FieldValues = FieldValues>({
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
} & InputTextareaProps &
  React.RefAttributes<HTMLTextAreaElement>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={classnames("p-float-label", styles.textarea)}>
          <InputTextarea {...field} {...props} />
          <label>{label}</label>
          <FormError error={error} />
        </div>
      )}
    />
  );
}
