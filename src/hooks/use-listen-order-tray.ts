import type { WebviewWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export const useListenOrderTray = (
  appWindow?: WebviewWindow,
  onAddOrder?: () => void,
) => {
  useEffect(() => {
    if (appWindow && onAddOrder) {
      let unlistenOrderTray: () => void;
      const listenOrderTray = async () => {
        unlistenOrderTray = await appWindow.listen("new_order", onAddOrder);
      };

      listenOrderTray();

      return () => unlistenOrderTray?.();
    }
  }, [appWindow, onAddOrder]);
};
