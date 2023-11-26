import { findState } from "../findState";

describe("findState", () => {
  it("should return default values", () => {
    const result = findState([]);

    expect(result).toBe(undefined);
  });

  it("should return true", () => {
    const result = findState([false, true, false]);

    expect(result).toBe(true);
  });
});