import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Layout from "./Layout";
import styles from "./Layout.module.scss";

const onClickOrderMock = vi.fn();

function renderLayout() {
  const content = <p>Application</p>;

  return render(<Layout onClickOrder={onClickOrderMock} >{content}</Layout>);
}

describe("Layout", () => {
  it("should render component", () => {
    renderLayout();

    expect(screen.getByText("Application")).toBeInTheDocument();
  });

  it("should open modal when user click by add order button", async () => {
    renderLayout();

    await userEvent.click(screen.getByTestId("add-order-btn"));

    expect(onClickOrderMock).toHaveBeenCalled();
  });

  it("should open sidebar menu when user click by arrow icon", async () => {
    const { container } = renderLayout();
    const sidebarMenuIcon = container.querySelectorAll(`.${styles["layout__icon-button"]}`)[0];

    await userEvent.click(screen.getByTestId("sidebar-btn"));

    expect(sidebarMenuIcon).toHaveClass(styles["layout__icon-button_open"]);
  });
});