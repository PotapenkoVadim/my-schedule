import { calculateDetails } from "../utils";

const details = [
  {
    "count": 3,
    "description": "замена фона",
    "sum": 2400
  },
  {
    "count": 1,
    "description": "биг панорама",
    "sum": 2000
  }
];

describe("utils", () => {
  describe("calculateDetails", () => {
    it("should calculate sum form order details", () => {
      const result = calculateDetails("sum", details);

      expect(result).toBe(4400);
    });

    it("should calculate count from order deails", () => {
      const result = calculateDetails("count", details);

      expect(result).toBe(4);
    });
  });
});