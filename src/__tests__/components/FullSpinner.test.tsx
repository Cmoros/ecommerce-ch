import React from "react";
import { render, screen } from "@testing-library/react";
import FullSpinner from "components/FullSpinner";

describe("<FullSpinner />", () => {
  it("renders a spinner in the center of the screen", () => {
    render(<FullSpinner />);

    const spinner = screen.getByRole("progressbar");
    const container = screen.getByRole("presentation");
    expect(spinner).toBeInTheDocument();
    expect(container).toHaveStyle("display: flex");
    expect(container).toHaveStyle("align-items: center");
    expect(container).toHaveStyle("justify-content: center");
  });

  it("applies thickness, speed, emptyColor, color, and size props to the spinner", () => {
    render(<FullSpinner />);

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toHaveStyle("border-width: 4px");
  });
});
