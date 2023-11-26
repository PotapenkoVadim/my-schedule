import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AccountTableToolbar } from "../components";
import { ThemeVariant } from "@/types";
import { CalendarChangeEvent } from "@/components";
import { ChangeEventHandler } from "react";

const onChangeDateMock = vi.fn();
const onSwitchMock = vi.fn();
const onChangeFilterMock = vi.fn();

const renderComponent = ({
  theme = "dark",
  date = new Date("2023-05-05"),
  checked = false,
  onChangeDate = onChangeDateMock,
  onSwitch = onSwitchMock,
  onChangeFilter = onChangeFilterMock,
  filterValue
}: {
  theme?: ThemeVariant;
  date?: Date;
  checked?: boolean;
  onChangeDate?: (event: CalendarChangeEvent) => void;
  onSwitch?: () => void;
  onChangeFilter?: ChangeEventHandler<HTMLInputElement>;
  filterValue?: string
}) => {
  return render(<AccountTableToolbar
    checked={checked}
    date={date}
    onChangeDate={onChangeDate}
    onChangeFilter={onChangeFilter}
    onSwitch={onSwitch}
    theme={theme}
    filterValue={filterValue}
  />);
};

describe("AccountTableToolbar", () => {
  it("should render component", () => {
    renderComponent({});

    expect(screen.getAllByRole("textbox")[0]).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[1]).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(screen.getByRole("switch")).toBeInTheDocument();
    expect(screen.getByText("Отображение выполненых заказов:")).toBeInTheDocument();
  });

  it("should call onChangeDateMock", async () => {
    renderComponent({date: new Date()});

    await userEvent.click(screen.getByRole("button"));
    await userEvent.click(screen.getByText("2025"));

    expect(onChangeDateMock).toHaveBeenCalled();
  });

  it("should call onChangeFilterMock", async () => {
    renderComponent({});

    await userEvent.type(screen.getAllByRole("textbox")[1], "query text");

    expect(onChangeFilterMock).toHaveBeenCalled();
  });

  it("should call onSwitchMock", async () => {
    renderComponent({});

    await userEvent.click(screen.getByRole("switch"));

    expect(onSwitchMock).toHaveBeenCalled();
  });

  it("should contains data-theme=dark", () => {
    const {container} = renderComponent({});
    const node = container.querySelector(".p-toolbar")! as HTMLElement;

    expect(node.getAttribute("data-theme")).toBe("dark");
  });

  it("should contains data-theme=light", () => {
    const {container} = renderComponent({theme: "light"});
    const node = container.querySelector(".p-toolbar")! as HTMLElement;

    expect(node.getAttribute("data-theme")).toBe("light");
  });
});