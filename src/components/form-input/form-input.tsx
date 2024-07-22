import { Controller, Control, FieldValues } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { FormError } from "../form-error/form-error";
import styles from "./form-input.module.scss";

export type FormInputProps<T extends FieldValues = FieldValues> =
  React.ComponentProps<typeof InputText> & {
    control: Control<T, any>;
    name: string;
    error?: string;
  };

export function FormInput<T extends FieldValues = FieldValues>(
  props: FormInputProps<T>,
) {
  const { control, name, error, ...other } = props;
  return (
    <div className={styles.input}>
      <Controller
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        name={name}
        control={control}
        render={({ field }) => (
          <InputText
            {...field}
            value={field.value || ""}
            invalid={Boolean(error)}
            {...other}
          />
        )}
      />
      <FormError error={error} />
    </div>
  );
}

export default FormInput;
