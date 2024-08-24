"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ThemeVariant, ToastType } from "@/types";
import { Toast } from "@/components";
import {
  DARK_THEME,
  LIGHT_THEME,
  TOAST_TITLE,
  WENT_WRONG_ERROR,
} from "@/constants";
import { useUserStore } from "@/stores";
import { useFetch } from "@/hooks";
import { editUserSettingsService } from "@/services";
import { AppContext } from "./app-context";

export function AppProvider({ children }: { children: React.ReactNode }) {
  const toast = useRef<Toast>(null);
  const [user] = useUserStore(({ user }) => [user]);
  const [theme, setTheme] = useState<ThemeVariant>(LIGHT_THEME);

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

  const { handleFetch } = useFetch({
    queryFn: editUserSettingsService,
    onSuccess: (response) => setTheme(response?.theme || theme),
    onError: () => showToast("error", WENT_WRONG_ERROR),
  });

  const switchTheme = useCallback(() => {
    const newTheme = theme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
    if (user) handleFetch(user.id, newTheme);
  }, [handleFetch, user, theme]);

  useLayoutEffect(() => {
    if (user?.settings?.theme) {
      setTheme(user.settings.theme);
    }
  }, [user]);

  const value = {
    theme,
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
