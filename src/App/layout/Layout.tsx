import { useState } from "react";
import {Outlet} from "react-router";
import {Sidebar} from "../components";
import { useAppContext } from "../context";
import { Button } from "@/components";
import { ThemeVariant } from "@/types";
import styles from "./Layout.module.scss";

export default function Layout() {
  const {theme, handleChangeTheme} = useAppContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  
  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);
  const handleSwitchTheme = () => {
    const themes = {
      dark: "light",
      light: "dark"
    };

    handleChangeTheme(themes[theme] as ThemeVariant);
  };

  return (
    <div className={styles["layout"]}>
      <Sidebar
        theme={theme}
        open={isOpenSidebar}
        handleHide={toggleSidebar}
        switchTheme={handleSwitchTheme}
      />

      <div data-theme={theme} className={styles["layout__content"]}>
        <Outlet />

        <div className={styles["layout__menu"]}>
          <Button
            icon="pi pi-bars"
            rounded
            onClick={toggleSidebar}
          />
        </div>
      </div>
    </div>
  );
}