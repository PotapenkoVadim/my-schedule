import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import Modal from "./Modal";

const closeModalMock = vi.fn();

function renderComponent() {
  return render(<Modal onClose={closeModalMock} title="Title" isOpen={true}>
    <div>Base Modal</div>
  </Modal>);
}

describe("Modal", () => {
  it("should render modal", () => {
    renderComponent();

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Base Modal")).toBeInTheDocument();
  });

  it("should call closeModalFn when user click by close icon", async () => {
    renderComponent();

    await userEvent.click(screen.getByRole("button"));

    expect(closeModalMock).toHaveBeenCalled();
  });
});