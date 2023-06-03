import { useState } from "react";
import { Layout } from "./components";
import { Calendar } from "./libs";

export default function App() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const setYear = (newYear: number) => setSelectedYear(newYear);

  return (
    <Layout>
      <div>
        <Calendar onChangeYear={setYear} year={selectedYear} />

        
        <div style={{ marginTop: "55px"}}>
          <p>table</p>
          <p>table</p>
          <p>table</p>
          <p>table</p>
        </div>
      </div>
    </Layout>
  );
}
