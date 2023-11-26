import { renderHook, act } from "@testing-library/react";
import { useCreateOrder } from "../orders/useCreateOrder";

describe("useCreateOrder", () => {
  it("should return default values", () => {
    const {result} = renderHook(useCreateOrder);

    expect(result.current.isErrorCreateOrder).toBeFalsy();
    expect(result.current.isLoadingCreateOrder).toBeFalsy();
  });

  it("should loading to be true", () => {
    const {result} = renderHook(useCreateOrder);

    act(() => {
      result.current.handleCreateOrder({order: "1"});
    });

    expect(result.current.isErrorCreateOrder).toBeFalsy();
    expect(result.current.isLoadingCreateOrder).toBeTruthy();
  });

  it("should return default values when handleCreateOrder is successful", () => {
    const {result} = renderHook(useCreateOrder);

    act(async () => {
      await result.current.handleCreateOrder({order: "1"});
    });

    expect(result.current.isErrorCreateOrder).toBeFalsy();
    expect(result.current.isLoadingCreateOrder).toBeFalsy();
  });
});