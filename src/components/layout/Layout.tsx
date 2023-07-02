import { ReactElement, useState } from "react";
import cn from "classnames";
import styles from "./Layout.module.scss";
import { ButtonVariant, IconColor, IconSize, IconVariant } from "../../enums";
import Icon from "../icon/Icon";
import Button from "../button/Button";

export default function Layout({
  children,
  onClickOrder
}: {
  children: ReactElement;
  onClickOrder: () => void;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={styles["layout"]}>
      <div className={cn([
        styles["layout__sidebar"],
        { [styles["layout__sidebar_open"]]: isSidebarOpen}
      ])}>
        <Button
          data-testid="sidebar-btn"
          className={cn([
            styles["layout__icon-button"],
            { [styles["layout__icon-button_open"]]: isSidebarOpen }
          ])}
          variant={ButtonVariant.ICON}
          onClick={toggleSidebar} >
          <Icon
            size={IconSize.SMALL}
            variant={IconVariant.DOUBLE_ARROW}
            color={IconColor.LIGHT} />
        </Button>

        <Button
          data-testid="calendar-btn"
          variant={ButtonVariant.ICON}
          className={styles["layout__icon-button"]} >
          <Icon variant={IconVariant.CALENDAR} />

          <span className={styles["layout__icon-button__text"]}>
            Мой календарь
          </span>
        </Button>
        
        <Button
          data-testid="add-order-btn"
          onClick={onClickOrder}
          variant={ButtonVariant.ICON}
          className={styles["layout__icon-button"]} >
          <Icon variant={IconVariant.ADD} />

          <span className={styles["layout__icon-button__text"]}>
            Добавить заказ
          </span>
        </Button>
      </div>
      
      <div className={styles["layout__content"]}>
        {children}
      </div>
    </div>
  );
}