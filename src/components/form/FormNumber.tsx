import { InputNumber, InputNumberProps } from "primereact/inputnumber";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.scss";

const FormNumber = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
  errorMessage,
  ...props
}: {
  control: Control<T, any>;
  name: Path<T>;
  label?: string;
  errorMessage?: string;
} & InputNumberProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <span className={cn("p-float-label", styles.form__field, className)}>
          <InputNumber
            className={styles["form__field-content"]}
            value={field.value}
            onChange={(e) => field.onChange(e.value as PathValue<T, Path<T>>)}
            {...props}
            />
          <label>{label}</label>
          {errorMessage && <span className={styles["form__field-error"]}>{errorMessage}</span>}
        </span>
      )}
    />
  );
};

export default FormNumber;
