import { findOrderByDate, getBackgroundColor, getDaysByWeeksOfYear, getTextColor } from "../utils";
import { datesOf2022 } from "./results";

const order1 = {
  id: "123",
  color: "red",
  customer: "Иван Ёклмнов",
  set: "Pretty Girls",
  deadline: ["2023-05-05", "2023-05-20"],
  comment: "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне.",
  done: false,
  details: [
    {
      count: 3,
      description: "3 фото Girls",
      sum: 100
    },
    {
      count: 2,
      description: "2 фото Boys",
      sum: 100
    }
  ]
};

const order2 = {
  id: "321",
  color: "red",
  customer: "Иван Ёклмнов",
  set: "Pretty Girls",
  deadline: ["2023-05-25", "2023-06-01"],
  comment: "Lorem Ipsum - это текст-рыба, часто используемый в печати и вэб-дизайне.",
  done: false,
  details: [
    {
      count: 3,
      description: "3 фото Girls",
      sum: 100
    },
    {
      count: 2,
      description: "2 фото Boys",
      sum: 100
    }
  ]
};

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
      const result = getBackgroundColor(new Date("2022-05-05"), [{deadline: ["2022-05-05"], color: "fff"}]);

      expect(result).toBe("#fff");
    });

    it("should return transparent value when dates does not equals", () => {
      const result = getBackgroundColor(new Date(), [{deadline: ["2022-05-05"], color: "fff"}]);

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
      const result = getTextColor(new Date("2022-05-05"), [{deadline: ["2022-05-05"], color: "fff"}]);

      expect(result).toBe("white");
    });

    it("should return white when order has black color", () => {
      const result = getTextColor(new Date(), [{deadline: ["2022-05-05"], color: "000"}]);

      expect(result).toBe("white");
    });

    it("should return white color when dates does not equals", () => {
      const result = getTextColor(new Date(), [{deadline: ["2022-05-05"], color: "ff0000"}]);

      expect(result).toBe("white");
    });
  });

  describe("findOrderByDate", () => {
    it("should return default", () => {
      const result = findOrderByDate(new Date(), []);

      expect(result).toBe(undefined);
    });

    it("should return finded order", () => {
      const result = findOrderByDate(new Date("2023-05-15"), [order1, order2]);

      expect(result).toEqual(order1);
    });
  });
});