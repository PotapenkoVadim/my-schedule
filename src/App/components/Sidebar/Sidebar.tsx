import { ThemeVariant } from "@/types";
import { BaseSidebar, InputSwitch, Menu } from "@/components";
import { getNavigateItems } from "@/App/utils";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";

export default function Sidebar({
  theme,
  open,
  handleHide,
  switchTheme
}: {
  theme: ThemeVariant;
  open: boolean;
  handleHide: () => void;
  switchTheme: () => void;
}) {
  const navigate = useNavigate();

  const navigateItems = getNavigateItems(navigate, handleHide);
  const themeTitle = theme === "dark" ? "Темная" : "Светлая";

  return (
    <BaseSidebar
      data-theme={theme}
      className={styles["sidebar"]}
      visible={open}
      onHide={handleHide}
    >
      <div className={styles["sidebar__header"]}>
        <div className={styles["sidebar__logo"]}>My Shedule</div>
      </div>

      <Menu
        data-theme={theme}
        model={navigateItems}
        className={styles["sidebar__menu"]}
      />

      <div className={styles["sidebar__theme-menu"]}>
        <div className={styles["sidebar__theme-title"]}>Переключить тему:</div>

        <div className={styles["sidebar__theme-switcher"]}>
          <span>{themeTitle}</span>
          <InputSwitch
            id="theme"
            checked={theme === "dark"}
            onChange={switchTheme}
          />
        </div>
      </div>
    </BaseSidebar>
  );
}