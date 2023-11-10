import { ColorPicker, ColorPickerProps } from "primereact/colorpicker";
import { Controller, Control, FieldValues, Path, PathValue } from "react-hook-form";

const FormColorPicker = <T extends FieldValues = FieldValues>({
  control,
  name,
  ...props
}: {
  control: Control<T, any>;
  name: Path<T>;
} & ColorPickerProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <ColorPicker
          name={name}
          value={field.value}
          onChange={(e) => field.onChange(e.value as PathValue<T, Path<T>>)}
          {...props}
        />
      )}
    />
  );
};

export default FormColorPicker;
