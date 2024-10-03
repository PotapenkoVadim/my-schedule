"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BaseSidebar,
  Button,
  Logo,
  SignOutButton,
  ThemeSwitcher,
} from "@/components";
import { useAppContext } from "@/context";
import { PATHS, WENT_WRONG_ERROR } from "@/constants";
import { useSession } from "@/hooks";
import { NavigationLinks } from "../navigation-links/navigation-links";
import styles from "./sidebar.module.scss";

export function Sidebar() {
  const { theme, switchTheme, showToast } = useAppContext();

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, isSessionLoading, signOut } = useSession(() =>
    showToast("error", WENT_WRONG_ERROR),
  );

  const toggleSidebar = () => setIsOpen(!isOpen);
  const moveToHome = () => {
    toggleSidebar();
    router.push(PATHS.home);
  };

  return (
    <>
      <BaseSidebar
        data-theme={theme}
        visible={isOpen}
        onHide={toggleSidebar}
        className={styles.sidebar}
      >
        <Logo onClick={moveToHome} className={styles.sidebar__logo} />
        <NavigationLinks
          currentUser={currentUser}
          theme={theme}
          classNames={styles.sidebar__menu}
          onBeforeNavigate={toggleSidebar}
        />

        {Boolean(currentUser) && (
          <ThemeSwitcher
            theme={theme}
            onSwitch={switchTheme}
            className={styles.sidebar__switcher}
          />
        )}

        <SignOutButton
          user={currentUser}
          className={styles.sidebar__button}
          onSignOut={signOut}
          isLoading={isSessionLoading}
        />
      </BaseSidebar>

      <div className={styles.sidebar__menubutton}>
        <Button rounded icon="pi pi-bars" onClick={toggleSidebar} />
      </div>
    </>
  );
}
