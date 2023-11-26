import { render, screen } from "@testing-library/react";
import ListItems from "../ListItems/ListItems";

describe("ListItems", () => {
  it("should render component without data", () => {
    render(<ListItems />);

    expect(screen.queryByText("1")).not.toBeInTheDocument();
    expect(screen.queryByText("2")).not.toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });

  it("should render component with data", () => {
    render(<ListItems items={[1, 2, 3]} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should display default text instead of undefined value", () => {
    render(<ListItems items={[1, undefined, 3] as Array<number>} />);

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("данные не указаны")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });
});