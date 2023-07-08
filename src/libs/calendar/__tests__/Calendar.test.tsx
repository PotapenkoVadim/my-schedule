import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import Calendar from "../Calendar";

const onChangeMock = vi.fn();
const handleDayClick = vi.fn();

const order = {
  id: "123",
  color: "red",
  customer: "Иван Ёклмнов",
  set: "Pretty Girls",
  deadline: ["2023-01-01", "2023-01-25"],
  comment: "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне.",
  done: false,
  details: [
    {
      count: 3,
      description: "3 фото Girls",
      sum: 100
    },
    {
      count: 2,
      description: "2 фото Boys",
      sum: 100
    }
  ]
};

describe("Calendar", () => {
  it("should render component", () => {
    render(<Calendar onClick={handleDayClick} orders={[]} year={2023} onChangeYear={onChangeMock} />);

    expect(screen.getByText("Год: 2023")).toBeInTheDocument();
    expect(screen.getByText("Январь")).toBeInTheDocument();
  });

  it("should change year by click on buttons", async () => {
    render(<Calendar onClick={handleDayClick} orders={[]} year={2023} onChangeYear={onChangeMock} />);

    await userEvent.click(screen.getByTestId("calendar-btn-left"));
    await userEvent.click(screen.getByTestId("calendar-btn-right"));

    expect(onChangeMock).toHaveBeenCalledTimes(2);
  });

  it("should not call handleDayClick when user click by day that is not part of the order", async () => {
    render(<Calendar onClick={handleDayClick} orders={[]} year={2023} onChangeYear={onChangeMock} />);

    await userEvent.click(screen.getAllByText(/1/i)[0]);

    expect(handleDayClick).not.toHaveBeenCalled();
  });


  it("should call handleDayClick when user click by day that is part of the order", async () => {
    render(<Calendar onClick={handleDayClick} orders={[order]} year={2023} onChangeYear={onChangeMock} />);

    await userEvent.click(screen.getAllByText(/1/i)[0]);

    expect(handleDayClick).toHaveBeenCalled();
    expect(handleDayClick).toHaveBeenCalledWith("123");
  });
});