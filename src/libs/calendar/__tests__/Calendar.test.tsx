import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Calendar from "../Calendar";

const onChangeMock = vi.fn();

describe("Calendar", () => {
  it("should render component", () => {
    render(<Calendar year={2023} onChangeYear={onChangeMock} />);

    expect(screen.getByText("Год: 2023")).toBeInTheDocument();
    expect(screen.getByText("Январь")).toBeInTheDocument();
  });

  it("should change year by click on buttons", async () => {
    render(<Calendar year={2023} onChangeYear={onChangeMock} />);

    await userEvent.click(screen.getByTestId("calendar-btn-left"));
    await userEvent.click(screen.getByTestId("calendar-btn-right"));

    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });
});