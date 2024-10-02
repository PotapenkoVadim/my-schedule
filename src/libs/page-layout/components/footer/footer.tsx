import { ThemeVariant } from "@/types";
import { FOOTER_LINKS, APP_TITLE, CURRENT_YEAR } from "@/constants";
import { FooterLink } from "../footer-link/footer-link";
import styles from "./footer.module.scss";

export function Footer({ theme }: { theme: ThemeVariant }) {
  const footerText = `${APP_TITLE}. Copyright © ${CURRENT_YEAR}`;

  return (
    <div data-theme={theme} className={styles.footer}>
      <div className={styles.footer__content}>
        <div className={styles.footer__links}>
          {FOOTER_LINKS.map(({ href, icon, id }) => (
            <FooterLink
              key={id}
              href={href}
              icon={icon}
              classNames={styles.footer__link}
            />
          ))}
        </div>

        <div>{footerText}</div>
      </div>
    </div>
  );
}
