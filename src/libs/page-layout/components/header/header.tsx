import { ThemeVariant } from "@/types";
import styles from "./header.module.scss";

export function Header({ theme }: { theme: ThemeVariant }) {
  return <div data-theme={theme} className={styles.header} />;
}
