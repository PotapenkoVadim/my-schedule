import { useCallback, useMemo, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { AppContext } from "./AppContext";
import { ThemeVariant, ToastType } from "@/types";
import { Toast } from "@/components";
import { toastTitle } from "@/constants/toast";

export default function AppProvider() {
  const toast = useRef<Toast>(null);

  const [theme, setTheme] = useState<ThemeVariant>("light");

  const handleChangeTheme = useCallback((theme: ThemeVariant) => {
    setTheme(theme);
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
      showToast
    };
  }, [theme, handleChangeTheme, showToast]);

  return (
    <AppContext.Provider value={value}>
      <Outlet />

      <Toast ref={toast} />
    </AppContext.Provider>
  );
}