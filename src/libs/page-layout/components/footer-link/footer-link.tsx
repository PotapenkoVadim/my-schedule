import classnames from "classnames";
import Link from "next/link";

export function FooterLink({
  href,
  icon,
  classNames,
}: {
  href: string;
  icon: string;
  classNames?: string;
}) {
  return (
    <Link href={href} target="_blank">
      <span className={classnames(icon, classNames)} />
    </Link>
  );
}
