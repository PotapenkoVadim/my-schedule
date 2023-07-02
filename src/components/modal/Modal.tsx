import { ReactNode } from "react";
import cn from "classnames";
import { ButtonVariant, IconColor, IconVariant } from "../../enums";
import Icon from "../icon/Icon";
import styles from "./Modal.module.scss";
import Button from "../button/Button";

export default function Modal({
  children,
  title,
  onClose,
  isOpen
}: {
  children: ReactNode;
  title: string;
  onClose: () => void;
  isOpen: boolean;
}) {
  return (
    <div className={cn([styles["modal"], { [styles["modal_open"]]: isOpen }])}>
      <div className={styles["modal__content"]}>
        <div className={styles["modal__header"]}>
          <div className={styles["modal__title"]}>{title}</div>

          <Button
            className={styles["modal__close"]}
            variant={ButtonVariant.ICON}
            onClick={onClose} >
            <Icon
              variant={IconVariant.CLOSE}
              color={IconColor.BLACK}
            />
          </Button>
        </div>
        <div className={styles["modal__body"]}>
          {children}
        </div>
      </div>
    </div>
  );
}