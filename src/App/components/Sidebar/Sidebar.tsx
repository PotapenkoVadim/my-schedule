import { ThemeVariant } from "@/types";
import { BaseSidebar, Menu } from "@/components";
import { getNavigateItems } from "@/App/utils";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";

export default function Sidebar({
  theme,
  open,
  handleHide
}: {
  theme: ThemeVariant;
  open: boolean;
  handleHide: () => void;
}) {
  const navigate = useNavigate();

  const navigateItems = getNavigateItems(navigate);

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

      <Menu data-theme={theme} model={navigateItems} className={styles["sidebar__menu"]} />
    </BaseSidebar>
  );
}