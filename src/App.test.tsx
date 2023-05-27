import { render, screen } from "@testing-library/react";
import { expect } from "vitest";

import App from "./App";

describe("App", () => {
  it("should render app", () => {
    render(<App />);

    expect(screen.getByText("Welcome to Tauri!")).toBeInTheDocument();
  });
});