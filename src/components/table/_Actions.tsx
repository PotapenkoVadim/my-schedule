import { Checkbox } from "primereact/checkbox";
import { ButtonVariant, IconColor, IconSize, IconVariant } from "../../enums";
import Button from "../button/Button";
import Icon from "../icon/Icon";
import styles from "./Table.module.scss";

export default function TableActions({
  onRemove,
  onEdit,
  onDone,
  isDone
}: {
  onRemove: () => void;
  onEdit: () => void;
  onDone: () => void;
  isDone?: boolean;
}) {
  return (
    <div className={styles["table__actions"]}>
      <Checkbox checked={Boolean(isDone)} onChange={onDone} />

      <Button
        variant={ButtonVariant.ICON}
        onClick={onEdit} >
        <Icon
          size={IconSize.MEDIUM}
          variant={IconVariant.EDIT}
          color={IconColor.WHITE} />
      </Button>
      
      <Button
        variant={ButtonVariant.ICON}
        onClick={onRemove} >
        <Icon
          size={IconSize.MEDIUM}
          variant={IconVariant.DELETE}
          color={IconColor.RED} />
      </Button>
    </div>
  );
}