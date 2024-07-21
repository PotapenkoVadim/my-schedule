"use client";

import { useCallback, useState } from "react";
import { ThemeVariant } from "@/types";
import { AppContext } from "./app-context";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<ThemeVariant>("dark");

  const changeTheme = useCallback((newTheme: ThemeVariant) => {
    setTheme(newTheme);
  }, []);

  const switchTheme = useCallback(() => {
    setTheme((value) => (value === "dark" ? "light" : "dark"));
  }, []);

  const value = {
    theme,
    changeTheme,
    switchTheme,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
