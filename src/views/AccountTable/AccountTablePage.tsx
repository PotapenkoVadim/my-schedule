import { useState } from "react";
import { OrderProvider } from "@/App/context";
import {AccountTableWrapper} from "./components";
import { PageContent } from "@/components";

export default function AccountTablePage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <OrderProvider year={selectedDate.getFullYear()}>
      <PageContent>
        <AccountTableWrapper
          selectedDate={selectedDate}
          setSelectedDate={(date) => setSelectedDate(date)}
        />
      </PageContent>
    </OrderProvider>
  );
}