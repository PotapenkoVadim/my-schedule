import { InputSwitch } from "primereact/inputswitch";
import classnames from "classnames";
import { ThemeVariant } from "@/types";
import styles from "./theme-switcher.module.scss";

export function ThemeSwitcher({
  theme,
  onSwitch,
  className,
}: {
  theme: ThemeVariant;
  onSwitch: () => void;
  className?: string;
}) {
  const isDarkTheme = theme === "Dark";
  const themeIcon = isDarkTheme ? "pi pi-sun" : "pi pi-moon";

  return (
    <div className={classnames(styles.theme, className)}>
      <div>Переключить тему:</div>

      <label className={styles.theme__switcher}>
        <span className={themeIcon} />
        <InputSwitch id="theme" checked={isDarkTheme} onChange={onSwitch} />
      </label>
    </div>
  );
}
