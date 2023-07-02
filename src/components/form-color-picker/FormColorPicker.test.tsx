import { useForm } from "react-hook-form";
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import FormColorPicker from "./FormColorPicker";

const onSubmit = vi.fn();

const FakeComponent = ({
  onSubmit,
  value
}: {
  onSubmit: (data: Record<string, unknown>) => void;
  value?: string;
}) => {
  const {handleSubmit, control} = useForm({
    defaultValues: { color: value ?? "000" }
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <label htmlFor="color">Form Color Picker</label>
      <FormColorPicker control={control} name="color" />
      <button>submit</button>
    </form>
  );
};

describe("FormColorPicker", () => {
  it("should render component", () => {
    render(<FakeComponent onSubmit={onSubmit} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should display default value", () => {
    render(<FakeComponent onSubmit={onSubmit} value="00F" />);

    expect(screen.getByRole("textbox")).toHaveStyle("background-color: rgb(0, 0, 15);");
  });
});