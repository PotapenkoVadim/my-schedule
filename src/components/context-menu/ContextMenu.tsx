import { useRef } from "react";
import { useClickOutside } from "primereact/hooks";
import Icon from "../icon/Icon";
import { IconColor, IconSize, IconVariant } from "../../enums";
import styles from "./ContextMenu.module.scss";
import { CtxMenu } from "../../types";

export default function ContextMenu({
  ctxMenu,
  closeCtxMenu,
  onDone,
  onEdit,
  onReady,
  onDelete
}: {
  ctxMenu: CtxMenu;
  closeCtxMenu: () => void;
  onDone: () => void;
  onReady: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const overlayRef = useRef(null);

  useClickOutside(overlayRef, closeCtxMenu);

  return (
    <div
      ref={overlayRef}
      data-testid="context-menu"
      onClick={closeCtxMenu}
      className={styles["menu"]}
      style={{top: `${ctxMenu.y}px`, left: `${ctxMenu.x}px`}}
    >
      <div onClick={onDone} className={styles["menu__item"]}>
        <Icon variant={IconVariant.DONE} size={IconSize.SMALL} />
        <span>{ctxMenu.order?.done ? "Не выполнено" : "Выполнено"}</span>
      </div>

      <div onClick={onReady} className={styles["menu__item"]}>
        <Icon variant={IconVariant.CALENDAR} size={IconSize.SMALL} />
        <span>{ctxMenu.order?.ready ? "Не готово" : "Готово"}</span>
      </div>

      <div onClick={onEdit} className={styles["menu__item"]}>
        <Icon variant={IconVariant.EDIT} size={IconSize.SMALL} />
        <span>Редактировать</span>
      </div>

      <div onClick={onDelete} className={styles["menu__item"]}>
        <Icon variant={IconVariant.DELETE} color={IconColor.RED} size={IconSize.SMALL} />
        <span>Удалить</span>
      </div>
    </div>
  );
};