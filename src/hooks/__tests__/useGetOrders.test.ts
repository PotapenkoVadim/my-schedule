import { renderHook, act } from "@testing-library/react";
import { useGetOrders } from "../orders/useGetOrders";

describe("useGetOrders", () => {
  it("should return default values", () => {
    const {result} = renderHook(useGetOrders);

    expect(result.current.isErrorOrders).toBeFalsy();
    expect(result.current.isLoadingOrders).toBeFalsy();
    expect(result.current.orders).toBeUndefined();
  });

  it("should loading to be true", () => {
    const {result} = renderHook(useGetOrders);

    act(() => {
      result.current.handleGetOrders({year: 2023});
    });

    expect(result.current.isErrorOrders).toBeFalsy();
    expect(result.current.isLoadingOrders).toBeTruthy();
    expect(result.current.orders).toBeUndefined();
  });

  it("should return default values when handleGetOrders is successful", async () => {
    const {result} = renderHook(useGetOrders);

    await result.current.handleGetOrders({year: 2023});

    expect(result.current.isErrorOrders).toBeFalsy();
    expect(result.current.isErrorOrders).toBeFalsy();
    expect(result.current.orders).toBeUndefined();
  });
});