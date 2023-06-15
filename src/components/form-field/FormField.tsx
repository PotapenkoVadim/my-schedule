import { InputHTMLAttributes } from "react";
import {Controller, Control, FieldValues, Path} from "react-hook-form";
import cn from "classnames";
import styles from "./FormField.module.scss";

export default function FormField<T extends FieldValues = FieldValues>({
  name,
  value,
  placeholder,
  control,
  ...otherProps
}: {
  control: Control<T, any>;
  name: Path<T>;
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <label className={styles["formfield"]}>
          <input
            className={styles["formfield__field"]}
            onChange={field.onChange}
            value={field.value}
            {...otherProps}
          />

          <span className={cn([
            styles["formfield__label"],
            {[styles["formfield__label_active"]]: Boolean(field.value) || field.value === 0}
          ])}>
            {placeholder}
          </span>
        </label>
      )}
    />
  );
}