import { InputSwitch } from "primereact/inputswitch";
import classnames from "classnames";
import { ThemeVariant } from "@/types";
import { DARK_THEME_TITLE, LIGHT_THEME_TITLE } from "@/constants";
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
  const themeTitle = theme === "dark" ? DARK_THEME_TITLE : LIGHT_THEME_TITLE;

  return (
    <div className={classnames(styles.theme, className)}>
      <div>Переключить тему:</div>

      <div className={styles.theme__switcher}>
        <span>{themeTitle}</span>
        <InputSwitch
          id="theme"
          checked={theme === "dark"}
          onChange={onSwitch}
        />
      </div>
    </div>
  );
}
