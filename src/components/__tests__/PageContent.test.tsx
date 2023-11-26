import { render, screen } from "@testing-library/react";
import PageContent from "../PageContent/PageContent";

describe("PageContent", () => {
  it("should render component", () => {
    render(<PageContent>Content</PageContent>);

    expect(screen.getByText("Content")).toBeInTheDocument();
  });
});