import { renderHook, act } from "@testing-library/react";
import { useDeleteOrder } from "../orders/useDeleteOrder";

describe("useDeleteOrder", () => {
  it("should return default values", () => {
    const {result} = renderHook(useDeleteOrder);

    expect(result.current.isErrorDeleteOrder).toBeFalsy();
    expect(result.current.isLoadingDeleteOrder).toBeFalsy();
  });

  it("should loading to be true", () => {
    const {result} = renderHook(useDeleteOrder);

    act(() => {
      result.current.handleDeleteOrder({orderId: "1"});
    });

    expect(result.current.isErrorDeleteOrder).toBeFalsy();
    expect(result.current.isLoadingDeleteOrder).toBeTruthy();
  });

  it("should return default values when handleDeleteOrder is successful", () => {
    const {result} = renderHook(useDeleteOrder);

    act(async () => {
      await result.current.handleDeleteOrder({orderId: "1"});
    });

    expect(result.current.isErrorDeleteOrder).toBeFalsy();
    expect(result.current.isLoadingDeleteOrder).toBeFalsy();
  });
});