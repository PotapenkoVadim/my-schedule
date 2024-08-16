"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BaseSidebar,
  Button,
  Logo,
  Menu,
  SignOutButton,
  ThemeSwitcher,
} from "@/components";
import { getNavigateLinks, isAdmin } from "@/utils";
import { useAppContext } from "@/context";
import { PATHS, WENT_WRONG_ERROR } from "@/constants";
import { useFetch, useSession } from "@/hooks";
import { signOutService } from "@/services";
import { useOrderStore } from "@/stores/order";
import styles from "./sidebar.module.scss";

export function Sidebar() {
  const { theme, switchTheme, showToast } = useAppContext();
  const [setOrderList] = useOrderStore(({ setOrderList }) => [setOrderList]);

  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const { currentUser, removeCurrentUser } = useSession();

  const { isLoading, handleFetch } = useFetch({
    queryFn: signOutService,
    onSuccess: () => {
      removeCurrentUser();
      setOrderList(null);
    },
    onError: () => showToast("error", WENT_WRONG_ERROR),
  });

  const toggleSidebar = () => setIsOpen(!isOpen);
  const moveToHome = () => {
    toggleSidebar();
    router.push(PATHS.home);
  };

  const navigateLinks = getNavigateLinks(
    router.push,
    toggleSidebar,
    isAdmin(currentUser),
  );

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

        <SignOutButton
          user={currentUser}
          className={styles.sidebar__button}
          onSignOut={handleFetch}
          isLoading={isLoading}
        />
      </BaseSidebar>

      <div className={styles.sidebar__menubutton}>
        <Button rounded icon="pi pi-bars" onClick={toggleSidebar} />
      </div>
    </>
  );
}
