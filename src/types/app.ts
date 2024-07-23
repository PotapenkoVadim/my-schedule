import { ThemeVariant } from "./theme";
import { ToastType } from "./toast";

export type AppContextType = {
  theme: ThemeVariant;
  changeTheme: (theme: ThemeVariant) => void;
  switchTheme: () => void;
  showToast: (type: ToastType, message: string) => void;
};
