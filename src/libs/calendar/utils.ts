import { Order } from "../../interfacies";
import { YearType } from "./types";

export const getDaysByWeeksOfYear = (year: number): Array<YearType> => {
  const startDate = new Date(year, 0, 1);
  const endDate = new Date(year, 11, 31);

  const datesArray = [];
  const currentDate = startDate;

  while (currentDate <= endDate) {
    datesArray.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  const monthsArray: Array<Array<Date>> = [];
  let currentMonth: Array<Date> = [];

  datesArray.forEach((date) => {
    if (currentMonth.length === 0 || date.getMonth() === currentMonth[0].getMonth()) {
      currentMonth.push(date);
    } else {
      monthsArray.push(currentMonth);
      currentMonth = [date];
    }
  });

  if (currentMonth.length > 0) {
    monthsArray.push(currentMonth);
  }

  return monthsArray.map(month => {
    return month.reduce((acc, item) => {
      const day = item.getDate();
      const weekIndex = item.getDay() - 1;
      const week = weekIndex < 0 ? 6 : weekIndex;

      if (day === 1 && week !== 0) {
        for (let i = 0; i < week; i++) {
          acc[i] = [null];
        }
      }
      
      acc[week] = acc[week] ? [...acc[week], item] : [item];

      return acc;
    }, [] as YearType);
  });
};

export const getBackgroundColor = (date: Date | null, orders?: Array<Order>): string => {
  const findedOrder = findOrderByDate(date, orders);

  return findedOrder ? `#${findedOrder.color!}` : "transparent";
};

export const getBorderColor = (date: Date | null, orders?: Array<Order>): string => {
  const findedOrder = findOrderByDate(date, orders);

  return findedOrder ? `#${findedOrder.color!}` : "transparent";
};

export const getTextColor = (date: Date | null, orders?: Array<Order>): string => {
  function getContrastYIQ(hexcolor?: string){
    if (!hexcolor || hexcolor === "000") return "white";
    if (hexcolor === "ffffff") return "black";

    const r = parseInt(hexcolor.substring(1,3),16);
    const g = parseInt(hexcolor.substring(3,5),16);
    const b = parseInt(hexcolor.substring(5,7),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;

    return (yiq >= 128) ? "black" : "white";
  }

  const findedOrder = findOrderByDate(date, orders);

  return getContrastYIQ(findedOrder?.color);
};

export const findOrderByDate = (day: Date | null, orders?: Array<Order>) => {
  return orders?.find(item => {
    if (item.deadline && day) {
      const start = item.deadline[0];
      const end = item.deadline[1] ?? item.deadline[0];

      if (day >= new Date(start) && day <= new Date(end) && !item.done) {
        return true;
      }
    }

    return false;
  });
};