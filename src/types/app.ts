import { ToastType } from "./toast";

export type AppContextType = {
  theme: ThemeVariant;
  handleChangeTheme: (theme: ThemeVariant) => void;
  showToast: (type: ToastType, message: string) => void;
};

export type ThemeVariant = "dark" | "light";