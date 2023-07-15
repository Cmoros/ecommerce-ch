import { render } from "@testing-library/react";
import NavLink from "components/NavLink";
import { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";

describe("NavLink", () => {
  const renderLink = (to: string, children: ReactNode) =>
    render(
      <MemoryRouter>
        <NavLink to={to}>{children}</NavLink>
      </MemoryRouter>
    );

  it("has the appropiate href", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavLink to="/home">Link</NavLink>
      </MemoryRouter>
    );

    const navLink = getByTestId(`navlink-/home`);
    expect(navLink.getAttribute("href")).toContain("/home");
  });

  it("renders children properly", () => {
    const { getByTestId } = renderLink("/home", "Home");
    const navLink = getByTestId(`navlink-/home`);
    expect(navLink).toHaveTextContent("Home");
  });

  it("can render many nav links uniques", () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/fruits">Fruits</NavLink>
      </MemoryRouter>
    );

    const navLink1 = getByTestId(`navlink-/home`);
    expect(navLink1.getAttribute("href")).toContain("/home");
    expect(navLink1).toHaveTextContent("Home");
    const navLink2 = getByTestId(`navlink-/fruits`);
    expect(navLink2.getAttribute("href")).toContain("/fruits");
    expect(navLink2).toHaveTextContent("Fruits");
  });
});
