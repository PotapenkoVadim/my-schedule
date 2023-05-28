import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Button from "./Button";
import { ButtonVariant } from "../../enums";
import styles from "./Button.module.scss";

describe("Button", () => {
  it("should render component", () => {
    const {container} = render(<Button variant={ButtonVariant.PRIMARY}>Button</Button>);

    expect(screen.getByText("Button")).toBeInTheDocument();
    expect(container.querySelector("button")).toBeInTheDocument();
  });

  it("should call function by click", async () => {
    const fnMock = vi.fn();

    render(<Button onClick={fnMock} variant={ButtonVariant.PRIMARY}>Button</Button>);

    await userEvent.click(screen.getByText("Button"));

    expect(fnMock).toHaveBeenCalled();
  });

  describe("Button Variant", () => {
    it("should apply primary variant", () => {
      const styleIndex = `button__${ButtonVariant.ICON}`;
      const {container} = render(<Button variant={ButtonVariant.ICON} />);

      expect(container.firstChild).toHaveClass(styles[styleIndex]);
    });
  });
});