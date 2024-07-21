import classnames from "classnames";
import { APP_TITLE } from "@/constants";
import { Button } from "primereact/button";
import styles from "./logo.module.scss";

export function Logo({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) {
  return (
    <Button
      text
      onClick={onClick}
      className={classnames(styles.logo, className)}
    >
      {APP_TITLE}
    </Button>
  );
}
