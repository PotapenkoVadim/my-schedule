import { eachWeekOfInterval, startOfYear, endOfYear, endOfWeek } from "date-fns";

// const year = 2023;
// const startDate = startOfYear(new Date(year, 0, 1));
// const endDate = endOfYear(new Date(year, 11, 31));
// const weeks = eachWeekOfInterval({ start: startDate, end: endDate });

// console.log(weeks);

const year = 2023;
const startDate = startOfYear(new Date(year, 0, 1));
const endDate = endOfYear(new Date(year, 11, 31));
const weeks = eachWeekOfInterval({ start: startDate, end: endDate }, { weekStartsOn: 1 });
const weekEnds = weeks.map((weekStart) => endOfWeek(weekStart, { weekStartsOn: 1 }));

console.log("WEEKS: ", weeks);
console.log("WEEKEND: ", weekEnds);

export default function Calendar() {
  return (
    <div>Calendar</div>
  );
}