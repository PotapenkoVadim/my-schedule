import classnames from "classnames";
import { Button, ButtonProps } from "primereact/button";
import { ProgressSpinner } from "@/components";
import styles from "./loading-button.module.scss";

export function LoadingButton({
  loading,
  children,
  className,
  ...other
}: ButtonProps & {
  loading: boolean;
}) {
  return (
    <Button className={classnames(styles.button, className)} {...other}>
      {loading && <ProgressSpinner className={styles.button__spinner} />}
      {children}
    </Button>
  );
}
