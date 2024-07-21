"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BaseSidebar, Button, Logo, Menu, ThemeSwitcher } from "@/components";
import { getNavigateLinks } from "@/utils";
import { useAppContext } from "@/context";
import { PATHS } from "@/constants";
import styles from "./sidebar.module.scss";

export function Sidebar() {
  const { theme, switchTheme } = useAppContext();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const moveToHome = () => {
    toggleSidebar();
    router.push(PATHS.home);
  };

  const navigateLinks = getNavigateLinks(router.push, toggleSidebar);

  return (
    <>
      <BaseSidebar
        data-theme={theme}
        visible={isOpen}
        onHide={toggleSidebar}
        className={styles.sidebar}
      >
        <Logo onClick={moveToHome} className={styles.sidebar__logo} />

        <Menu
          data-theme={theme}
          model={navigateLinks}
          className={styles.sidebar__menu}
        />

        <ThemeSwitcher
          theme={theme}
          onSwitch={switchTheme}
          className={styles.sidebar__switcher}
        />
      </BaseSidebar>

      <div className={styles.sidebar__button}>
        <Button rounded icon="pi pi-bars" onClick={toggleSidebar} />
      </div>
    </>
  );
}
