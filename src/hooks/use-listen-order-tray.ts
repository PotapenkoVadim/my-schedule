import { useEffect } from "react";
import { useAppWindow } from "./use-app-window";

export const useListenOrderTray = (onAddOrder: () => void) => {
  const appWindow = useAppWindow();

  useEffect(() => {
    if (appWindow) {
      let unlistenOrderTray: () => void;
      const listenOrderTray = async () => {
        unlistenOrderTray = await appWindow.listen("new_order", onAddOrder);
      };

      listenOrderTray();

      return () => unlistenOrderTray?.();
    }
  }, [appWindow, onAddOrder]);
};
