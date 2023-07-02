import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import List from "./List";

describe("List", () => {
  it("should render component", () => {
    render(<List items={["one", "two", "three"]} />);

    expect(screen.getByText("one")).toBeInTheDocument();
    expect(screen.getByText("two")).toBeInTheDocument();
    expect(screen.getByText("three")).toBeInTheDocument();
  });
});