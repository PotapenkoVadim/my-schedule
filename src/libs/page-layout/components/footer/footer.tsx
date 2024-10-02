import { ThemeVariant } from "@/types";
import styles from "./footer.module.scss";

export function Footer({ theme }: { theme: ThemeVariant }) {
  return <div data-theme={theme} className={styles.footer} />;
}
