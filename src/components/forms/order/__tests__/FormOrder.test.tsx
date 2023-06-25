import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormOrder from "../FormOrder";
import { vi } from "vitest";

const onSubmit = vi.fn();

const order = {
  id: "123",
  color: "red",
  customer: "Иван Ёклмнов",
  set: "Pretty Girls",
  deadline: [new Date("2023-05-05"), new Date("2023-05-20")],
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

describe("FormOrder", () => {
  it("should render component", () => {
    render(<FormOrder onSubmit={onSubmit} />);

    expect(screen.getByText("Заказчик"));
    expect(screen.getByText("Сет"));
    expect(screen.getByText("Дедлайн"));
    expect(screen.getByText("Коментарий"));
    expect(screen.getByText("Создать"));
  });

  it("should render component whit default data", () => {
    render(<FormOrder onSubmit={onSubmit} editedOrder={order} />);

    expect(screen.getByTestId("customer-field")).toHaveValue("Иван Ёклмнов");
    expect(screen.getByTestId("set-field")).toHaveValue("Pretty Girls");
    expect(screen.getByTestId("comment-field")).toHaveValue("Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне.");
    expect(screen.getByText("Редактировать"));
  });

  it("should call onSubmit when user click by button", async () => {
    render(<FormOrder onSubmit={onSubmit} editedOrder={order} />);

    await userEvent.click(screen.getByText("Редактировать"));

    expect(onSubmit).toHaveBeenCalled();
    expect(onSubmit).toHaveBeenCalledWith(order);
  });

  it("should add and remove order details when user click by buttons", async () => {
    render(<FormOrder onSubmit={onSubmit} />);

    await userEvent.click(screen.getByTestId("details-add"));

    expect(screen.getByText("Количество")).toBeInTheDocument();
    expect(screen.getByText("Описание")).toBeInTheDocument();
    expect(screen.getByText("Сумма")).toBeInTheDocument();

    await userEvent.click(screen.getByTestId("details-remove"));

    expect(screen.queryByText("Количество")).not.toBeInTheDocument();
    expect(screen.queryByText("Описание")).not.toBeInTheDocument();
    expect(screen.queryByText("Сумма")).not.toBeInTheDocument();
  });
});