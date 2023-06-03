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
      
      acc[week] = acc[week]
        ? [...acc[week], item]
        : [item];

      return acc;
    }, [] as YearType);
  });
};