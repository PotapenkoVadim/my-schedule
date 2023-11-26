import { renderHook, act } from "@testing-library/react";
import { useUpdateOrder } from "../orders/useUpdateOrder";

describe("useUpdateOrder", () => {
  it("should return default values", () => {
    const {result} = renderHook(useUpdateOrder);

    expect(result.current.isErrorUpdateOrder).toBeFalsy();
    expect(result.current.isLoadingUpdateOrder).toBeFalsy();
  });

  it("should loading to be true", () => {
    const {result} = renderHook(useUpdateOrder);

    act(() => {
      result.current.handleUpdateOrder({orderId: "1", updatedOrder: "123"});
    });

    expect(result.current.isErrorUpdateOrder).toBeFalsy();
    expect(result.current.isLoadingUpdateOrder).toBeTruthy();
  });

  it("should return default values when handleDeleteOrder is successful", () => {
    const {result} = renderHook(useUpdateOrder);

    act(async () => {
      await result.current.handleUpdateOrder({orderId: "1", updatedOrder: "123"});
    });

    expect(result.current.isErrorUpdateOrder).toBeFalsy();
    expect(result.current.isLoadingUpdateOrder).toBeFalsy();
  });
});