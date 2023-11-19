import { useState } from "react";
import { CalendarWrapper } from "./components";
import { currentYear } from "@/constants";
import { OrderProvider } from "@/App/context";
import { PageContent } from "@/components";

export default function CalendarPage() {
  const [selectedYear, setSelectedYear] = useState(currentYear);

  return (
    <OrderProvider year={selectedYear}>
      <PageContent>
        <CalendarWrapper
          selectedYear={selectedYear}
          setSelectedYear={(year) => setSelectedYear(year)}
        />
      </PageContent>
    </OrderProvider>
  );
}