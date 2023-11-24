import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { AccountTableWrapper } from "../components";
import { useAppContext, useOrderContext } from "@/App/context";
import { OrderType } from "@/types";
import { ContextMenu } from "primereact/contextmenu";
import { ordersMockData } from "@/__mocks__/order";

const setSelectedDateMock = vi.fn();
const locationMock = vi.fn();
const ctxShowMock = vi.fn();
const setCtxDataMock = vi.fn();

const mocks = vi.hoisted(() => {
  return {
    useOrderContext: vi.fn(),
    useAppContext: vi.fn()
  };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...mod,
    useLocation: () => locationMock
  };
});

vi.mock("@/App/context", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/App/context")>();

  return {
    ...mod,
    useAppContext: mocks.useAppContext,
    useOrderContext: mocks.useOrderContext,
  };
});

const renderComponent = (orders?: Array<OrderType>, ctxRef?: {current: ContextMenu}) => {
  vi.mocked(useOrderContext).mockReturnValue({
    orders: orders || [],
    loading: false,
    ctxRef: ctxRef || {current: null},
    setCtxData: setCtxDataMock,
    handleGetOrders: vi.fn()
  });

  vi.mocked(useAppContext).mockReturnValue({
    theme: "dark",
    handleChangeTheme: vi.fn(),
    showToast: vi.fn()
  });

  return render(<AccountTableWrapper selectedDate={new Date()} setSelectedDate={setSelectedDateMock} />);
};

describe("AccountTableWrapper", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render empty component", () => {
    renderComponent();

    expect(screen.getByText("Отображение выполненых заказов:")).toBeInTheDocument();
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

  it("should render component with order data", () => {
    renderComponent(ordersMockData);

    expect(screen.queryByText("Не найдено подходящего заказа.")).not.toBeInTheDocument();
    expect(screen.getByText("Dy Bless")).toBeInTheDocument();
    expect(screen.getByText("Arcane")).toBeInTheDocument();
    expect(screen.getByText("Н.Викулова")).toBeInTheDocument();
    expect(screen.getByText("Сейлор сложное")).toBeInTheDocument();
  });

  it("should call context actions", async () => {
    const user = userEvent.setup();
    const ctxRef = {current: {show: ctxShowMock}} as any;
    renderComponent(ordersMockData, ctxRef);

    await user.pointer([{keys: "[MouseRight>]", target: screen.getByText("Dy Bless")}]);

    expect(ctxShowMock).toBeCalled();
    expect(setCtxDataMock).toBeCalled();
  });
});