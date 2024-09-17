import { useEffect, useState } from "react";
import type { WebviewWindow } from "@tauri-apps/api/window";
import { useListenThemeTray } from "./use-listen-theme-tray";
import { useListenOrderTray } from "./use-listen-order-tray";

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

  useListenOrderTray(appWindow, onAddOrder);
  useListenThemeTray(appWindow, onSwitchTheme);
};
