import { ThemeVariant } from "./theme";

export type AppContextType = {
  theme: ThemeVariant;
  changeTheme: (theme: ThemeVariant) => void;
  switchTheme: () => void;
};
