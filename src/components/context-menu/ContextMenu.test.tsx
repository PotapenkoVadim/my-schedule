import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ContextMenu from "./ContextMenu";
import { vi } from "vitest";

const ctxMenu = {
  show: false,
  y: 0,
  x: 0
};

const closeCtxMenuMock = vi.fn();
const onDeleteMock = vi.fn();
const onDoneMock = vi.fn();
const onEditMock = vi.fn();
const onReadyMock = vi.fn();

describe("ContextMenu", () => {
  it("should render component", () => {
    render(<ContextMenu
      ctxMenu={{...ctxMenu, show: true}}
      closeCtxMenu={closeCtxMenuMock}
      onDelete={onDeleteMock}
      onDone={onDoneMock}
      onEdit={onEditMock}
      onReady={onReadyMock}
    />);

    expect(screen.getByText("Выполнено")).toBeInTheDocument();
    expect(screen.getByText("Редактировать")).toBeInTheDocument();
    expect(screen.getByText("Удалить")).toBeInTheDocument();
  });

  it("should call closeCtxMenuMock when user clic by menu", async () => {
    render(<ContextMenu
      ctxMenu={{...ctxMenu, show: true}}
      closeCtxMenu={closeCtxMenuMock}
      onDelete={onDeleteMock}
      onDone={onDoneMock}
      onEdit={onEditMock}
      onReady={onReadyMock}
    />);

    await userEvent.click(screen.getByTestId("context-menu"));

    expect(closeCtxMenuMock).toHaveBeenCalled();
  });

  it("should call onDeleteMock when user clic by Удалить", async () => {
    render(<ContextMenu
      ctxMenu={{...ctxMenu, show: true}}
      closeCtxMenu={closeCtxMenuMock}
      onDelete={onDeleteMock}
      onDone={onDoneMock}
      onEdit={onEditMock}
      onReady={onReadyMock}
    />);

    await userEvent.click(screen.getByText("Удалить"));

    expect(onDeleteMock).toHaveBeenCalled();
    expect(closeCtxMenuMock).toHaveBeenCalled();
  });

  it("should call onDone when user clic by Выполнено", async () => {
    render(<ContextMenu
      ctxMenu={{...ctxMenu, show: true}}
      closeCtxMenu={closeCtxMenuMock}
      onDelete={onDeleteMock}
      onDone={onDoneMock}
      onEdit={onEditMock}
      onReady={onReadyMock}
    />);

    await userEvent.click(screen.getByText("Выполнено"));

    expect(onDoneMock).toHaveBeenCalled();
    expect(closeCtxMenuMock).toHaveBeenCalled();
  });

  it("should call onDone when user clic by Редактировать", async () => {
    render(<ContextMenu
      ctxMenu={{...ctxMenu, show: true}}
      closeCtxMenu={closeCtxMenuMock}
      onDelete={onDeleteMock}
      onDone={onDoneMock}
      onEdit={onEditMock}
      onReady={onReadyMock}
    />);

    await userEvent.click(screen.getByText("Редактировать"));

    expect(onEditMock).toHaveBeenCalled();
    expect(closeCtxMenuMock).toHaveBeenCalled();
  });
});