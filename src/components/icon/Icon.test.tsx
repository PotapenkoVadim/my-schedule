import { render } from "@testing-library/react";
import { expect } from "vitest";
import Icon from "./Icon";
import { IconColor, IconSize, IconVariant } from "../../enums";
import styles from "./Icon.module.scss";

describe("Icon", () => {
  it("should render component", () => {
    const {container} = render(<Icon variant={IconVariant.CALENDAR} />);

    expect(container.querySelector("span")).toBeInTheDocument();
  });

  describe("Icon Variant", () => {
    it.each([
      [IconVariant.CALENDAR,      `icon__${IconVariant.CALENDAR}`],
      [IconVariant.ADD,           `icon__${IconVariant.ADD}`],
      [IconVariant.DOUBLE_ARROW,  `icon__${IconVariant.DOUBLE_ARROW}`],
      [IconVariant.ARROW_BACK,    `icon__${IconVariant.ARROW_BACK}`],
      [IconVariant.ARROW_FORWARD, `icon__${IconVariant.ARROW_FORWARD}`],
      [IconVariant.CLOSE,         `icon__${IconVariant.CLOSE}`],
      [IconVariant.DELETE,        `icon__${IconVariant.DELETE}`],
      [IconVariant.EDIT,          `icon__${IconVariant.EDIT}`],
      [IconVariant.DONE,          `icon__${IconVariant.DONE}`],
    ])("should apply each variant", (variant, className) => {
      const {container} = render(<Icon variant={variant} />);

      expect(container.firstChild).toHaveClass(styles[className]);
    });
  });

  describe("Icon Size", () => {
    it.each([
      [IconSize.LARGE,  `icon_${IconSize.LARGE}`],
      [IconSize.MEDIUM, `icon_${IconSize.MEDIUM}`],
      [IconSize.SMALL,  `icon_${IconSize.SMALL}`],
    ])("should apply each size", (size, className) => {
      const {container} = render(<Icon variant={IconVariant.CALENDAR} size={size} />);

      expect(container.firstChild).toHaveClass(styles[className]);
    });
  });

  describe("Icon Color", () => {
    it.each([
      [IconColor.BLACK,  `icon_${IconColor.BLACK}`],
      [IconColor.LIGHT,  `icon_${IconColor.LIGHT}`],
      [IconColor.WHITE,  `icon_${IconColor.WHITE}`],
      [IconColor.RED,    `icon_${IconColor.RED}`],
      [IconColor.BLUE,   `icon_${IconColor.BLUE}`],
    ])("should apply each color", (color, className) => {
      const {container} = render(<Icon variant={IconVariant.CALENDAR} color={color} />);

      expect(container.firstChild).toHaveClass(styles[className]);
    });
  });
});