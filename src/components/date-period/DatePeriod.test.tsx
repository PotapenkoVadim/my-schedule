import { useForm } from "react-hook-form";
import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import DatePeriod from "./DatePeriod";

const onSubmit = vi.fn();

const FakeComponent = ({
  onSubmit,
  value
}: {
  onSubmit: (data: Record<string, unknown>) => void;
  value?: string;
}) => {
  const {handleSubmit, control} = useForm({
    defaultValues: { deadline: [] }
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
    >
      <label htmlFor="deadline">DatePeriod</label>
      <DatePeriod control={control} name="deadline" />
      <button>submit</button>
    </form>
  );
};

describe("DatePeriod", () => {
  it("should render component", () => {
    render(<FakeComponent onSubmit={onSubmit} />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});