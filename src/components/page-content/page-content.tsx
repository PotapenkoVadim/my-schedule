import { ReactNode } from "react";
import classnames from "classnames";
import styles from "./page-content.module.scss";

export function PageContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={classnames(className, styles.content)}>{children}</div>
  );
}
