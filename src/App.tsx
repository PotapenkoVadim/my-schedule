import { useState } from "react";
import { Layout, Table } from "./components";
import { Calendar } from "./libs";

export default function App() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const setYear = (newYear: number) => setSelectedYear(newYear);

  return (
    <Layout>
      <div>
        <Calendar onChangeYear={setYear} year={selectedYear} />

        <Table />
      </div>
    </Layout>
  );
}
