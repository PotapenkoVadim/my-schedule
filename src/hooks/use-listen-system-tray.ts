import { useEffect, useState } from "react";
import type { WebviewWindow } from "@tauri-apps/api/window";

export const useListenSystemTray = ({
  onSwitchTheme,
  onAddOrder,
}: {
  onSwitchTheme?: () => void;
  onAddOrder?: () => void;
}) => {
  const [appWindow, setAppWindow] = useState<WebviewWindow>();

  async function setupAppWindow() {
    const { appWindow } = await import("@tauri-apps/api/window");
    setAppWindow(appWindow);
  }

  useEffect(() => {
    const client = process.env.NEXT_PUBLIC_CLIENT?.trim();

    if (client === "desktop") {
      setupAppWindow();
    }
  }, []);

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

  useEffect(() => {
    if (appWindow && onSwitchTheme) {
      let unlistenThemeTray: () => void;
      const listenThemeTray = async () => {
        unlistenThemeTray = await appWindow.listen(
          "switch_theme",
          onSwitchTheme,
        );
      };

      listenThemeTray();

      return () => unlistenThemeTray?.();
    }
  }, [appWindow, onSwitchTheme]);
};
