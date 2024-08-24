import classNames from "classnames";
import { ProgressSpinner } from "@/components";
import { ThemeVariant } from "@/types";
import styles from "./spinner.module.scss";

export function Spinner({
  isPage = false,
  className,
  theme,
}: {
  isPage?: boolean;
  className?: string;
  theme?: ThemeVariant;
}) {
  const classes = classNames(
    styles.spinner,
    { [styles.spinner_page]: isPage },
    className,
  );

  return (
    <div data-theme={theme} className={classes}>
      <ProgressSpinner />
    </div>
  );
}
