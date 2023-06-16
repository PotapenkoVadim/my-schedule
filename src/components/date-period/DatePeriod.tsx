import { Calendar, CalendarProps } from "primereact/calendar";
import { Controller, Control, Path, FieldValues } from "react-hook-form";

export default function DatePeriod<T extends FieldValues = FieldValues>({
  name,
  control,
  className
}: {
  control: Control<T, any>;
  name: Path<T>;
} & CalendarProps) {
  return (
    <Controller
      name={name}
      control={control}
      render={({field}) => (
        <Calendar
          className={className}
          dateFormat="dd.mm.yy"
          name={field.name}
          onChange={field.onChange}
          value={field.value}
          selectionMode="range"
          readOnlyInput
        />
      )}
    />
  );
}