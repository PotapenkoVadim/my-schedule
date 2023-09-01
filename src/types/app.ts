export type AppContextType = {
  theme: ThemeVariant;
  handleChangeTheme: (theme: ThemeVariant) => void;
};

export type ThemeVariant = "dark" | "light";