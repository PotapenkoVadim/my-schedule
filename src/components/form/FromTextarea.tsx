import { InputTextarea, InputTextareaProps } from "primereact/inputtextarea";
import { Controller, Control, FieldValues, Path } from "react-hook-form";
import cn from "classnames";
import styles from "./form.module.scss";

const FormTextarea = <T extends FieldValues = FieldValues>({
  control,
  name,
  label,
  className,
  ...props
}: {
  control: Control<T, any>;
  name: Path<T>;
  label?: string;
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
        </span>
      )}
    />
  );
};

export default FormTextarea;