import { render } from "@testing-library/react";
import SpinnerBlock from "../SpinnerBlock/SpinnerBlock";

describe("SpinnerBlock", () => {
  it("should render component", () => {
    const {container} = render(<SpinnerBlock />);

    expect(container.querySelector(".p-progress-spinner")).toBeInTheDocument();
  });
});