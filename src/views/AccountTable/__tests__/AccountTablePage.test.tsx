import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import AccountTablePage from "../AccountTablePage";
import { useOrderContext } from "@/App/context";
import { OrderType } from "@/types";
import { ordersMockData } from "@/__mocks__/order";

const mocks = vi.hoisted(() => {
  return { useOrderContext: vi.fn() };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...mod,
    useLocation: () => ({state: null, key: null})
  };
});

vi.mock("@/App/context", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/App/context")>();

  return {
    ...mod,
    useAppContext: () => ({theme: "dark"}),
    useOrderContext: mocks.useOrderContext,
    OrderProvider: ({children}: any) => (
      <div>
        <div>Order Context</div>
        {children}
      </div>
    ),
  };
});

const MockComponent = (loading: boolean, orders: Array<OrderType> | undefined) => {
  vi.mocked(useOrderContext).mockReturnValue({
    orders,
    loading,
    ctxRef: {current: null},
    setCtxData: vi.fn(),
    handleGetOrders: vi.fn()
  });

  return render(<AccountTablePage />);
};

describe("AccountTablePage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render component", () => {
    MockComponent(false, []);

    expect(screen.getByText("Order Context")).toBeInTheDocument();
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

  it("should render order table", () => {
    MockComponent(false, ordersMockData);

    expect(screen.getByText("Dy Bless")).toBeInTheDocument();
    expect(screen.getByText("Arcane")).toBeInTheDocument();
    expect(screen.getByText("Общее количество: 3")).toBeInTheDocument();
    expect(screen.getByText("Итого: 2400")).toBeInTheDocument();
    expect(screen.getByText("Н.Викулова")).toBeInTheDocument();
    expect(screen.getByText("Сейлор сложное")).toBeInTheDocument();
    expect(screen.getByText("Общее количество: 1")).toBeInTheDocument();
    expect(screen.getByText("Итого: 2000")).toBeInTheDocument();
  });

  it("should render loading state", () => {
    const {container} = MockComponent(true, undefined);

    expect(screen.getByText("Order Context")).toBeInTheDocument();
    expect(container.querySelector(".p-progress-spinner")).toBeInTheDocument();
  });
});