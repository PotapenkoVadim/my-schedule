import { useEffect } from "react";
import { useAppWindow } from "./use-app-window";

export const useListenThemeTray = (onSwitchTheme: () => void) => {
  const appWindow = useAppWindow();

  useEffect(() => {
    if (appWindow) {
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
