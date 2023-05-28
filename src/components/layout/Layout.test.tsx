import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Layout from "./Layout";

function renderLayout() {
  const content = <p>Application</p>;

  return render(<Layout>{content}</Layout>);
}

describe("Layout", () => {
  it("should render component", () => {
    renderLayout();

    expect(screen.getByText("Application")).toBeInTheDocument();
  });
});