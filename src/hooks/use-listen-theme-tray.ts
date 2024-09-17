import type { WebviewWindow } from "@tauri-apps/api/window";
import { useEffect } from "react";

export const useListenThemeTray = (
  appWindow?: WebviewWindow,
  onSwitchTheme?: () => void,
) => {
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
