import { ButtonHTMLAttributes } from "react";
import cn from "classnames";
import styles from "./Button.module.scss";
import { ButtonVariant } from "../../enums";

export default function Button({
  variant = ButtonVariant.PRIMARY,
  className,
  ...props
}: {
  variant?: ButtonVariant;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn([
        styles["button"],
        styles[`button__${variant}`],
        { [className!]: Boolean(className) }
      ])}
    />
  );
}