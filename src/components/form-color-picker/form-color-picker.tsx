"use client";

import { ColorPicker, ColorPickerProps } from "primereact/colorpicker";
import {
  Controller,
  Control,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

export function FormColorPicker<T extends FieldValues = FieldValues>({
  control,
  name,
  className,
  ...props
}: {
  control: Control<T, any>;
  name: Path<T>;
} & ColorPickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={className}>
          <ColorPicker
            name={name}
            value={field.value}
            onChange={(e) => field.onChange(e.value as PathValue<T, Path<T>>)}
            {...props}
          />
        </div>
      )}
    />
  );
}
