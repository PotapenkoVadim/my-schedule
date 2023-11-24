import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CalendarWrapper } from "../components";
import { vi } from "vitest";
import { useAppContext, useOrderContext } from "@/App/context";
import { MONTHS } from "@/libs/calendar/constants";
import { OrderType } from "@/types";
import { ContextMenu } from "primereact/contextmenu";
import { ordersMockData } from "@/__mocks__/order";

const handleSelectedYearMock = vi.fn();
const navigateMock = vi.fn();
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
    useNavigate: () => navigateMock
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

  return render(<CalendarWrapper selectedYear={2023} setSelectedYear={handleSelectedYearMock} />);
};

describe("CalendarWrapper", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render component", () => {
    renderComponent();

    expect(screen.getByText(/год: 2023/i)).toBeInTheDocument();
    MONTHS.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  it("should call handleSelectedYearMock", async () => {
    renderComponent();

    await userEvent.click(screen.getAllByRole("button")[0]);
    await userEvent.click(screen.getAllByRole("button")[1]);

    expect(handleSelectedYearMock).toHaveBeenCalledTimes(2);
  });

  it("should call navigateMock", async () => {
    const {container} = renderComponent(ordersMockData);
    const node = container.querySelector(
      "#calendar > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)"
    )!;

    await userEvent.click(node);

    expect(navigateMock).toHaveBeenCalled();
  });

  it("should call context actions", async () => {
    const user = userEvent.setup();
    const ctxRef = {current: {show: ctxShowMock}} as any;
    const {container} = renderComponent(ordersMockData, ctxRef);
    const node = container.querySelector(
      "#calendar > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(3)"
    )!;

    await user.pointer([{keys: "[MouseRight>]", target: node}]);

    expect(ctxShowMock).toBeCalled();
    expect(setCtxDataMock).toBeCalled();
  });
});