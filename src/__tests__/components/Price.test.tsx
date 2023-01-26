import { render, screen } from "@testing-library/react";
import Price from "components/Price";

describe("<Price />", () => {
  it("renders the children with decimals", () => {
    render(<Price>12.34</Price>);

    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText("34")).toBeInTheDocument();
  });

  it("applies letterSpacing, fontSize, color and textAlign props", () => {
    render(
      <Price
        fontSize="30px"
        color="peru"
        letterSpacing="-2px"
        textAlign="right"
      >
        56.78
      </Price>
    );

    const price = screen.getByText("56");
    const decimals = screen.getByText("78");
    expect(price).toHaveStyle("letter-spacing: -2px");
    expect(price).toHaveStyle("font-size: 30px");
    expect(price).toHaveStyle("color: peru");
    expect(price).toHaveStyle("text-align: right");
    expect(decimals).not.toHaveStyle("font-size: 30px");
  });

  it("formats decimal as '.00' when not provided", () => {
    render(<Price>90</Price>);

    expect(screen.getByText("90")).toBeInTheDocument();
    expect(screen.getByText(".00")).toBeInTheDocument();
  });

  it("does not render anything if no children are provided", () => {
    render(<Price />);

    const price = screen.queryByText("$");
    const ceros = screen.queryByText(".00");
    expect(price).not.toBeInTheDocument();
    expect(ceros).not.toBeInTheDocument();
  });
});
