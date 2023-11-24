import { render, screen } from "@testing-library/react";
import { vi } from "vitest";
import { AccountTable } from "../components";
import { OrderType, ThemeVariant } from "@/types";
import { DataTableFilterMeta } from "@/components";
import { SyntheticEvent } from "react";
import { ordersMockData } from "@/__mocks__/order";
import userEvent from "@testing-library/user-event";

const onContextClickMock = vi.fn();

const renderComponent = ({
  theme = "dark",
  data,
  filters = {},
  onContextClick = onContextClickMock
}: {
  theme?: ThemeVariant;
  data?: Array<OrderType>;
  filters?: DataTableFilterMeta;
  onContextClick?: (e: SyntheticEvent<Element, Event>, order?: OrderType) => void;
}) => {
  return render(<AccountTable
    theme={theme}
    filters={filters}
    onContextClick={onContextClick}
    data={data}
  />);
};

describe("AccountTable", () => {
  it("should render component without data", () => {
    renderComponent({});

    expect(screen.getByText("Заказчик")).toBeInTheDocument();
    expect(screen.getByText("Фотосет")).toBeInTheDocument();
    expect(screen.getByText("Дедлайн")).toBeInTheDocument();
    expect(screen.getByText("Детализация")).toBeInTheDocument();
    expect(screen.getByText("Стоимость")).toBeInTheDocument();
    expect(screen.getByText("Коментарий")).toBeInTheDocument();
    expect(screen.getByText("Готов")).toBeInTheDocument();
    expect(screen.getByText("Сдан")).toBeInTheDocument();
    expect(screen.getByText("Не найдено подходящего заказа.")).toBeInTheDocument();
  });

  it("should render component with data", () => {
    renderComponent({data: ordersMockData});

    expect(screen.queryByText("Не найдено подходящего заказа.")).not.toBeInTheDocument();
    expect(screen.getByText("Dy Bless")).toBeInTheDocument();
    expect(screen.getByText("Arcane")).toBeInTheDocument();
    expect(screen.getByText("Н.Викулова")).toBeInTheDocument();
    expect(screen.getByText("Сейлор сложное")).toBeInTheDocument();
  });

  it("should call onContextClickMock", async () => {
    const user = userEvent.setup();
    renderComponent({data: ordersMockData});

    await user.pointer([{keys: "[MouseRight>]", target: screen.getByText("Dy Bless")}]);

    expect(onContextClickMock).toHaveBeenCalled();
  });

  it("should contains data-theme=dark", () => {
    const {container} = renderComponent({data: ordersMockData});
    const node = container.querySelector(".p-datatable")! as HTMLElement;

    expect(node.getAttribute("data-theme")).toBe("dark");
  });

  it("should contains data-theme=light", () => {
    const {container} = renderComponent({data: ordersMockData, theme: "light"});
    const node = container.querySelector(".p-datatable")! as HTMLElement;

    expect(node.getAttribute("data-theme")).toBe("light");
  });
});