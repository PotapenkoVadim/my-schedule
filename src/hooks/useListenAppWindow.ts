import { useEffect } from "react";
import { appWindow } from "@tauri-apps/api/window";

export const useListenAppWindow = (onNewOrder: () => void, onSwitchTheme: () => void) => {
  let unlistenOrder: () => void;
  let unlistenTheme: () => void;

  const listen = async () => {
    unlistenOrder = await appWindow.listen("new_order", onNewOrder);
    unlistenTheme = await appWindow.listen("switch_theme", onSwitchTheme);
  };

  const unlisten = () => {
    unlistenOrder();
    unlistenTheme();
  };


  useEffect(() => {
    listen();

    return () => unlisten();
  }, []);
};