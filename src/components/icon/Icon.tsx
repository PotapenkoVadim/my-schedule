import cn from "classnames";
import styles from "./Icon.module.scss";
import { IconColor, IconSize, IconVariant } from "../../enums";

export default function Icon({
  variant,
  color = IconColor.WHITE,
  size = IconSize.MEDIUM,
  className
}: {
  variant: IconVariant;
  size?: IconSize;
  color?: IconColor;
  className?: string;
}) {
  return (
    <span className={cn([
      styles["icon"],
      styles[`icon__${variant}`],
      styles[`icon_${color}`],
      styles[`icon_${size}`],
      { [className!]: Boolean(className) }
    ])} />
  );
}