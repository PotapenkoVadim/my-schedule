import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";
import { ThemeVariant } from "@/types";

export default function AppProvider() {
  const [theme, setTheme] = useState<ThemeVariant>("dark");

  const handleChangeTheme = useCallback((theme: ThemeVariant) => {
    setTheme(theme);
  }, []);

  const value = useMemo(() => {
    return {
      theme,
      handleChangeTheme
    };
  }, [theme]);

  return (
    <AppContext.Provider value={value}>
      <Outlet />
    </AppContext.Provider>
  );
}