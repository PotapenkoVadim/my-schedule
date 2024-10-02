import { useEffect, useState } from "react";
import type { WebviewWindow } from "@tauri-apps/api/window";

export const useAppWindow = () => {
  const [appWindow, setAppWindow] = useState<WebviewWindow>();

  async function setupAppWindow() {
    const { appWindow } = await import("@tauri-apps/api/window");
    setAppWindow(appWindow);
  }

  useEffect(() => {
    const client = process.env.NEXT_PUBLIC_CLIENT?.trim();

    if (client === "desktop" && !appWindow) {
      setupAppWindow();
    }
  }, []);

  return appWindow;
};
