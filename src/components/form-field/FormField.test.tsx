import { useForm } from "react-hook-form";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import FormField from "./FormField";

const onSubmit = vi.fn();

const FakeComponent = ({
  onSubmit,
  value
}: {
  onSubmit: (data: Record<string, unknown>) => void;
  value?: string;
}) => {
  const {handleSubmit, control} = useForm({
    defaultValues: { field: value ?? "" }
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <label htmlFor="field">Form Field</label>
      <FormField control={control} name="field" />
      <button>submit</button>
    </form>
  );
};

describe("FormField", () => {
  it("should render component", () => {
    render(<FakeComponent onSubmit={onSubmit} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should type chars", async () => {
    render(<FakeComponent onSubmit={onSubmit} />);

    await userEvent.type(screen.getByRole("textbox"), "test");

    expect(screen.getByRole("textbox")).toHaveValue("test");
  });

  it("should provide data to control", async () => {
    render(<FakeComponent onSubmit={onSubmit} />);

    await userEvent.type(screen.getByRole("textbox"), "test");
    await userEvent.click(screen.getByText("submit"));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toBeCalledWith({ field: "test" });
  });

  it("should display default value", () => {
    render(<FakeComponent onSubmit={onSubmit} value="default" />);

    expect(screen.getByRole("textbox")).toHaveValue("default");
  });
});