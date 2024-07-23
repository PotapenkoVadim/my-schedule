"use client";

import { useCallback, useRef, useState } from "react";
import { ThemeVariant, ToastType } from "@/types";
import { Toast } from "@/components";
import { TOAST_TITLE } from "@/constants";
import { AppContext } from "./app-context";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const toast = useRef<Toast>(null);
  const [theme, setTheme] = useState<ThemeVariant>("Dark");

  const changeTheme = useCallback((newTheme: ThemeVariant) => {
    setTheme(newTheme);
  }, []);

  const switchTheme = useCallback(() => {
    setTheme((value) => (value === "Dark" ? "Light" : "Dark"));
  }, []);

  const showToast = useCallback(
    (type: ToastType, message: string) => {
      if (toast.current) {
        toast.current.show({
          severity: type,
          summary: TOAST_TITLE[type],
          detail: message,
        });
      }
    },
    [toast],
  );

  const value = {
    theme,
    changeTheme,
    switchTheme,
    showToast,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
      <Toast ref={toast} />
    </AppContext.Provider>
  );
}
