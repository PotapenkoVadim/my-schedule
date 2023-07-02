import { ColorPicker, ColorPickerProps } from "primereact/colorpicker";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

export default function FormColorPicker<T extends FieldValues = FieldValues>({
  name,
  control
}: {
  control: Control<T, any>;
  name: Path<T>;
} & ColorPickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <ColorPicker
          name={field.name}
          onChange={field.onChange}
          value={field.value}
        />
      )}
    />
  );
}