import { ChangeEventHandler, SyntheticEvent } from "react";
import classnames from "classnames";
import { useRouter } from "next/navigation";
import {
  Toolbar as BaseToolbar,
  Button,
  Calendar,
  InputSwitch,
  InputText,
} from "@/components";
import { ThemeVariant, UserScopes } from "@/types";
import { FormEvent } from "primereact/ts-helpers";
import { locale, addLocale } from "primereact/api";
import { PATHS } from "@/constants";
import { UserEntity } from "@/interfaces";
import { PermissionGuard } from "@/libs/permission-guard/permission-guard";
import styles from "./toolbar.module.scss";

export function Toolbar({
  theme,
  date,
  checked,
  user,
  onChangeDate,
  onSwitch,
  onChangeFilter,
  onAddOrder,
  filterValue,
}: {
  theme: ThemeVariant;
  date: Date;
  checked: boolean;
  user: UserEntity | null;
  onChangeDate: (
    event: FormEvent<Date, SyntheticEvent<Element, Event>>,
  ) => void;
  onSwitch: () => void;
  onChangeFilter: ChangeEventHandler<HTMLInputElement>;
  onAddOrder: () => void;
  filterValue?: string;
}) {
  locale("ru");
  addLocale("ru", { firstDayOfWeek: 1 });

  const router = useRouter();

  const moveToCalendar = () => router.push(PATHS.calendar);

  return (
    <BaseToolbar
      data-theme={theme}
      start={
        <div
          className={classnames(styles.toolbar__row, styles.toolbar__row_right)}
        >
          <div className={styles.toolbar__row}>
            <Button onClick={moveToCalendar} icon="pi pi-table" />
            {Boolean(user) && (
              <PermissionGuard
                currentUser={user}
                scopes={[UserScopes.allowOrder]}
              >
                <Button onClick={onAddOrder} icon="pi pi-plus" />
              </PermissionGuard>
            )}

            <Calendar
              value={date}
              onChange={onChangeDate}
              dateFormat="yy"
              view="year"
              readOnlyInput
              showIcon
              locale="ru"
            />
          </div>

          <div
            className={classnames("p-input-icon-left", styles.toolbar__search)}
          >
            <i className="pi pi-search" />
            <InputText
              placeholder="Поиск по заказчику и фотосету"
              value={filterValue}
              onChange={onChangeFilter}
            />
          </div>
        </div>
      }
      end={
        <div className={styles["toolbar__order-show"]}>
          <div>Отображение выполненных заказов:</div>
          <InputSwitch id="switch" checked={checked} onChange={onSwitch} />
        </div>
      }
    />
  );
}
