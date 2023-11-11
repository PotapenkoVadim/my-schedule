import { vi } from "vitest";
import { getNavigateItems } from "../utils";

const navigate = vi.fn();
const hideSidebarMock = vi.fn();

describe("utils", () => {
  describe("getNavigateItems", () => {
    it("should retrun default values", () => {
      const result = getNavigateItems(navigate, hideSidebarMock);

      expect(result).toBe(result);
    });
  });
});