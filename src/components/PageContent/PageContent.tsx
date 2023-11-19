import { PropsWithChildren } from "react";
import styles from "./PageContent.module.scss";

export default function PageContent({children}: PropsWithChildren) {
  return <div className={styles["content"]}>{children}</div>;
}