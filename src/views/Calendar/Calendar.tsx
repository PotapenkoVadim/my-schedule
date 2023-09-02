import { useState } from "react";
import { useAppContext } from "@/App/context/AppContext";
import { PageContent } from "@/components";
import { Calendar } from "@/libs";

export default function CalendarPage() {
  const {theme} = useAppContext();

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const setYear = (newYear: number) => setSelectedYear(newYear);

  return (
    <PageContent>
      <Calendar
        orders={[]}
        year={selectedYear}
        onChangeYear={setYear}
        onClick={() => []}
        theme={theme}
      />
    </PageContent>
  );
}