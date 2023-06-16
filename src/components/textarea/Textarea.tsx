import { InputHTMLAttributes } from "react";
import cn from "classnames";
import {Controller, Control, FieldValues, Path} from "react-hook-form";
import styles from "./Textarea.module.scss";

export default function Textarea<T extends FieldValues = FieldValues>({
  name,
  value,
  placeholder,
  control,
  ...otherProps
}: {
  control: Control<T, any>;
  name: Path<T>;
} & InputHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <label className={styles["textarea"]}>
          <textarea
            className={styles["textarea__field"]}
            onChange={field.onChange}
            value={field.value}
            {...otherProps}
          />

          <span className={cn([
            styles["textarea__label"],
            {[styles["textarea__label_active"]]: Boolean(field.value) || field.value === 0}
          ])}>
            {placeholder}
          </span>
        </label>
      )}
    />
  );
}