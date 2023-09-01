import { useState } from "react";
import {Outlet} from "react-router";
import {Sidebar} from "../components";
import { useAppContext } from "../context/AppContext";
import { Button } from "@/components";
import styles from "./Layout.module.scss";

export default function Layout() {
  const {theme} = useAppContext();

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  
  const toggleSidebar = () => setIsOpenSidebar(!isOpenSidebar);

  return (
    <div className={styles["layout"]}>
      <Sidebar theme={theme} open={isOpenSidebar} handleHide={toggleSidebar} />

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