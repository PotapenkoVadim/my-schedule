import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.scss";

const FormTextarea = <T extends FieldValues = FieldValues>({
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
} & InputTextareaProps & React.RefAttributes<HTMLTextAreaElement>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <span className={cn("p-float-label", styles.form__field, className)}>
          <InputTextarea
            className={styles["form__field-content"]}
            {...field}
            {...props}
          />
          <label>{label}</label>
          {errorMessage && <span className={styles["form__field-error"]}>{errorMessage}</span>}
        </span>
      )}
    />
  );
};

export default FormTextarea;