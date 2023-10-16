import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import { Order } from "../../interfacies";
import Table from "./Table";

const orders: Array<Order> = [
  {
    id: "123",
    color: "red",
    customer: "Иван Ёклмнов",
    set: "Pretty Girls",
    deadline: ["2023-05-05", "2023-05-20"],
    comment:
      "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной рыбой для текстов на латинице с начала XVI века. В то время некий безымянный печатник создал большую коллекцию размеров и форм шрифтов, используя Lorem Ipsum для распечатки образцов. Lorem Ipsum не только успешно пережил без заметных изменений пять веков, но и перешагнул в электронный дизайн. Его популяризации в новое время послужили публикация листов Letraset с образцами Lorem Ipsum в 60-х годах и, в более недавнее время, программы электронной вёрстки типа Aldus PageMaker, в шаблонах которых используется Lorem Ipsum",
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
  },
  {
    id: "124",
    color: "blue",
    customer: "Степан Ёклмнов",
    set: "Pretty Girls",
    deadline: [],
    comment: "Душнила 123 123 comment test",
    done: false,
    details: [
      {
        count: 1,
        description: "1 фото Girls",
        sum: 100
      },
    ]
  }
];

const onDone = vi.fn();
const onEdit = vi.fn();
const onDelete = vi.fn();
const onReady = vi.fn();

describe("Table", () => {
  it("should render component", () => {
    render(<Table
      onDoneOrder={onDone}
      onEditOrder={onEdit}
      onRemoveOrder={onDelete}
      orders={orders}
      onReadyOrder={onReady}
    />);
    
    expect(screen.getByText("Заказчик")).toBeInTheDocument();
    expect(screen.getByText("Дедлайн")).toBeInTheDocument();
    expect(screen.getByText("Комментарий")).toBeInTheDocument();

    expect(screen.getByText("Иван Ёклмнов")).toBeInTheDocument();
    expect(screen.getByText("Душнила 123 123 comment test")).toBeInTheDocument();
    expect(screen.getByText("Общее количество: 5")).toBeInTheDocument();
    expect(screen.getByText("Итого: 200")).toBeInTheDocument();
  });

  it.skip("should call onDone when user click by checkbox", async () => {
    render(<Table
      onDoneOrder={onDone}
      onEditOrder={onEdit}
      onRemoveOrder={onDelete}
      orders={orders}
      onReadyOrder={onReady}
    />);

    await userEvent.click(screen.getAllByRole("checkbox")[1]);

    expect(onDone).toHaveBeenCalled();
    expect(onDone).toHaveBeenCalledWith(orders[0]);
  });

  it.skip("should call onEdit when user click by edit icon", async () => {
    render(<Table
      onDoneOrder={onDone}
      onEditOrder={onEdit}
      onRemoveOrder={onDelete}
      orders={orders}
      onReadyOrder={onReady}
    />);

    await userEvent.click(screen.getAllByRole("button")[0]);

    expect(onEdit).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalledWith(orders[0]);
  });

  it.skip("should call onDelete when user click by remove icon", async () => {
    render(<Table
      onDoneOrder={onDone}
      onEditOrder={onEdit}
      onRemoveOrder={onDelete}
      orders={orders}
      onReadyOrder={onReady}
    />);

    await userEvent.click(screen.getAllByRole("button")[1]);

    expect(onEdit).toHaveBeenCalled();
    expect(onEdit).toHaveBeenCalledWith(orders[0]);
  });

  it.skip("should display empty message", () => {
    render(<Table
      onDoneOrder={onDone}
      onEditOrder={onEdit}
      onRemoveOrder={onDelete}
      orders={[]}
      onReadyOrder={onReady}
    />);

    expect(screen.getByText("Нет заказов")).toBeInTheDocument();
  });
});