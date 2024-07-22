import { Checkbox as PrimeCheckbox, CheckboxProps } from "primereact/checkbox";
import classnames from "classnames";
import styles from "./checkbox.module.scss";

export function Checkbox({
  id,
  label,
  className,
  ...other
}: CheckboxProps & { label: string }) {
  return (
    <div className={classnames(styles.checkbox, className)}>
      <PrimeCheckbox id={id} {...other} />
      {Boolean(label) && (
        <label className={styles.checkbox__label} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
}
