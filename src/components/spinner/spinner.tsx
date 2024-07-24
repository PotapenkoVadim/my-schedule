import classNames from "classnames";
import { ProgressSpinner } from "@/components";
import styles from "./spinner.module.scss";

export function Spinner({
  isPage = false,
  className,
}: {
  isPage?: boolean;
  className?: string;
}) {
  const classes = classNames(
    styles.spinner,
    { [styles.spinner_page]: isPage },
    className,
  );

  return (
    <div className={classes}>
      <ProgressSpinner />
    </div>
  );
}
