import { ButtonVariant, IconColor, IconSize, IconVariant } from "../../enums";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import styles from "./Table.module.scss";

export default function TableActions() {
  return (
    <div className={styles["table__sctions"]}>
      <Button
          variant={ButtonVariant.ICON}
          onClick={() => console.log("delete")} >
          <Icon
            size={IconSize.MEDIUM}
            variant={IconVariant.DELETE}
            color={IconColor.RED} />
        </Button>
    </div>
  );
}