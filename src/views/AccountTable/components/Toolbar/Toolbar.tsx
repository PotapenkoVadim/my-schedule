import { InputSwitch, Toolbar, Calendar } from "@/components";
import { ThemeVariant } from "@/types";
import styles from "./Toolbar.module.scss";

export default function AccountTableToolbar({theme}: {theme: ThemeVariant}) {
  const dates = [new Date(2023, 0, 1), new Date()];

  return (
    <Toolbar
      className={styles["toolbar"]}
      data-theme={theme}
      start={
        <Calendar
          value={dates}
          selectionMode="range"
          readOnlyInput
          showIcon
        />
      }
      end={
        <div className={styles["toolbar__order-show"]}>
          <div>Отображение выполненых заказов:</div>
          <InputSwitch
            id="switch"
            checked
          />
        </div>
      }
    />
  );
}