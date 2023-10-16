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

  const isWeekend = date ? [0, 6].includes(date.getDay()) : false;
  const isWeekendOrder = checkWeekend(findedOrder?.deadline);
  const isShowWeekendOrder = !isWeekend || isWeekendOrder;

  if (findedOrder?.ready && !findedOrder.done && isShowWeekendOrder) {
    return `
      repeating-linear-gradient(
        45deg,
        #${findedOrder.color!},
        #${findedOrder.color!} 10px,
        rgba(0, 0, 0, 0) 10px,
        rgba(0, 0, 0, 0) 20px)
    `;
  }

  return findedOrder && !findedOrder.done && isShowWeekendOrder
    ? `#${findedOrder.color!}`
    : "transparent";
};

export const getBorderColor = (date: Date | null, orders?: Array<Order>): string => {
  const findedOrder = findOrderByDate(date, orders);

  const isWeekend = date ? [0, 6].includes(date.getDay()) : false;
  const isWeekendOrder = checkWeekend(findedOrder?.deadline);
  const isShowWeekendOrder = !isWeekend || isWeekendOrder;

  return findedOrder && isShowWeekendOrder
    ? `#${findedOrder.color!}`
    : "transparent";
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

  const isWeekend = date ? [0, 6].includes(date.getDay()) : false;
  const isWeekendOrder = checkWeekend(findedOrder?.deadline);
  const isShowWeekendOrder = !isWeekend || isWeekendOrder;

  return isShowWeekendOrder ? getContrastYIQ(findedOrder?.color) : "white";
};

export const findOrderByDate = (day: Date | null, orders?: Array<Order>) => {
  const sortedOrders = orders?.sort((a, b) => {
    const start = new Date(a?.deadline![a.deadline!.length - 1]);
    const end = new Date(b?.deadline![b.deadline!.length - 1]);

    return Number(start) - Number(end);
  });

  return sortedOrders?.find(item => {
    if (item.deadline && day) {
      const start = item.deadline[0];
      const end = item.deadline[1] ?? item.deadline[0];

      if (day >= new Date(start) && day <= new Date(end)) {
        return true;
      }
    }

    return false;
  });
};

export const checkWeekend = (date?: Array<string>) => {
  if (date) {
    const startDay = date[0] ? new Date(date[0]).getDay() : null;
    const endDay = date[1] ? new Date(date[1]).getDay() : null;

    return ([0, 6].includes(startDay!) && endDay === null)
      || (startDay === 6 && endDay === 0);
  }

  return false;
};