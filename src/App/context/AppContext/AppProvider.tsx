import { useCallback, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";
import { ThemeVariant, ToastType } from "@/types";
import { Toast } from "@/components";
import { toastTitle } from "@/constants";

export default function AppProvider() {
  const toast = useRef<Toast>(null);

  const [theme, setTheme] = useState<ThemeVariant>("dark");

  const handleChangeTheme = useCallback((theme: ThemeVariant) => {
    setTheme(theme);
  }, []);

  const switchTheme = useCallback(() => {
    setTheme(theme => theme === "dark" ? "light" : "dark");
  }, []);

  const showToast = useCallback((type: ToastType, message: string) => {
    if (toast.current) {
      toast.current.show({
        severity: type,
        summary: toastTitle[type],
        detail: message
      });
    }
  }, [toast]);

  const value = useMemo(() => {
    return {
      theme,
      handleChangeTheme,
      showToast,
      switchTheme
    };
  }, [theme, handleChangeTheme, showToast, switchTheme]);

  return (
    <AppContext.Provider value={value}>
      <Outlet />
      <Toast ref={toast} />
    </AppContext.Provider>
  );
}