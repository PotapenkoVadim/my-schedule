import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import { RouterMap, defaultPage } from "@/constants";
import {AccountTablePage, CalendarPage} from "@/views";
import AppProvider from "./context/AppProvider";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppProvider />}>
          <Route path={RouterMap.Home} element={<Layout />}>
            <Route index element={<Navigate to={defaultPage} replace />} />
            <Route path={RouterMap.Calendar} element={<CalendarPage />} />
            <Route path={RouterMap.AccountTable} element={<AccountTablePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}