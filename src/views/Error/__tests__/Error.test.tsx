import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";
import ErrorPage from "../Error";

const navigateMock = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const mod = await importOriginal<typeof import("react-router-dom")>();

  return {
    ...mod,
    useNavigate: () => navigateMock
  };
});

describe("ErrorPage", () => {
  it("should render component", () => {
    render(<ErrorPage />);

    expect(screen.getByText("Something went wrong!")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /go back/i })).toBeInTheDocument();
  });

  it("should call navigateMock when user clicks by button", async () => {
    render(<ErrorPage />);

    await userEvent.click(screen.getByRole("button", { name: /go back/i }));

    expect(navigateMock).toHaveBeenCalled();
  });
});