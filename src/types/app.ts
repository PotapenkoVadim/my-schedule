import { ThemeVariant } from "./theme";
import { ToastType } from "./toast";

export type AppContextType = {
  theme: ThemeVariant;
  switchTheme: () => void;
  showToast: (type: ToastType, message: string) => void;
};
