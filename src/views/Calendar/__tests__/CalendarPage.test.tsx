import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import CalendarPage from "../CalendarPage";
import { useOrderContext } from "@/App/context";

const mocks = vi.hoisted(() => {
  return { useOrderContext: vi.fn() };
});

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...mod,
    useNavigate: () => vi.fn()
  };
});

vi.mock("@/libs", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/libs")>();

  return {
    ...mod,
    Calendar: () => <div>Calendar</div>
  };
});

vi.mock("@/hooks", async (importOriginal) => {
  const mod = await importOriginal<typeof import("@/hooks")>();

  return {
    ...mod,
    useListenAppWindow: vi.fn(),
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

const MockComponent = (loading: boolean, orders: Array<never> | undefined) => {
  vi.mocked(useOrderContext).mockReturnValue({
    orders,
    loading,
    ctxRef: {current: null},
    setCtxData: vi.fn(),
    handleGetOrders: vi.fn(),
    handleNewOrder: vi.fn()
  });

  return render(<CalendarPage />);
};

describe("CalendarPage", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render component", () => {
    MockComponent(false, []);

    expect(screen.getByText("Order Context")).toBeInTheDocument();
    expect(screen.getByText("Calendar")).toBeInTheDocument();
  });

  it("should render loading state", () => {
    const {container} = MockComponent(true, undefined);

    expect(screen.getByText("Order Context")).toBeInTheDocument();
    expect(container.querySelector(".p-progress-spinner")).toBeInTheDocument();
    expect(screen.queryByText("Calendar")).not.toBeInTheDocument();
  });
});