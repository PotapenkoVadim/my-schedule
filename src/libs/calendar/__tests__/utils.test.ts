import { getBackgroundColor, getDaysByWeeksOfYear, getTextColor } from "../utils";
import { datesOf2022 } from "./results";

describe("utils", () => {
  describe("getDaysByWeeksOfYear", () => {
    it("should return array of days by weeks", () => {
      const result = getDaysByWeeksOfYear(2022);

      expect(result).toEqual(datesOf2022);
    });
  });

  describe("getBackgroundColor", () => {
    it("should return transparent value when has not date", () => {
      const result = getBackgroundColor(null, []);
  
      expect(result).toBe("transparent");
    });

    it("should return transparent value when has not order list", () => {
      const result = getBackgroundColor(new Date(), []);

      expect(result).toBe("transparent");
    });

    it("should return order color when dates equals", () => {
      const result = getBackgroundColor(new Date(), [{deadline: [new Date()], color: "fff"}]);

      expect(result).toBe("#fff");
    });

    it("should return transparent value when dates does not equals", () => {
      const result = getBackgroundColor(new Date(), [{deadline: [new Date("2022-05-05")], color: "fff"}]);

      expect(result).toBe("transparent");
    });
  });

  describe("getTextColor", () => {
    it("should return white by default", () => {
      const result = getTextColor(null, []);

      expect(result).toBe("white");
    });

    it("should return white when has not orders", () => {
      const result = getTextColor(new Date(), []);

      expect(result).toBe("white");
    });

    it("should return black when order has white color", () => {
      const result = getTextColor(new Date(), [{deadline: [new Date()], color: "fff"}]);

      expect(result).toBe("black");
    });

    it("should return white when order has black color", () => {
      const result = getTextColor(new Date(), [{deadline: [new Date()], color: "000"}]);

      expect(result).toBe("white");
    });

    it("should return white color when dates does not equals", () => {
      const result = getTextColor(new Date(), [{deadline: [new Date("2022-05-05")], color: "ff0000"}]);

      expect(result).toBe("white");
    });
  });
});