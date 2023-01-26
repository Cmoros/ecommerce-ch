/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { render } from "@testing-library/react";
import { useCartContext } from "context/cartContext";
import CartWidget from "components/CartWidget";
import { MemoryRouter } from "react-router-dom";

jest.mock("context/cartContext");

describe("<CartWidget />", () => {
  it("should render the cart icon button", () => {
    (useCartContext as any).mockImplementation(() => ({
      getTotalQuantity: jest.fn(() => 0),
    }));

    const { getByRole } = render(
      <MemoryRouter>
        <CartWidget />
      </MemoryRouter>
    );
    const cartButton = getByRole("img");
    expect(cartButton).toBeInTheDocument();
  });

  it("should display the total quantity when the cart is not empty", () => {
    (useCartContext as any).mockImplementation(() => ({
      getTotalQuantity: jest.fn(() => 3),
    }));

    const { getByText } = render(
      <MemoryRouter>
        <CartWidget />
      </MemoryRouter>
    );
    const totalQuantity = getByText("3");
    expect(totalQuantity).toBeInTheDocument();
  });

  it("should not display the total quantity when the cart is empty", () => {
    (useCartContext as any).mockImplementation(() => ({
      getTotalQuantity: jest.fn(() => 0),
    }));

    const { queryByText } = render(
      <MemoryRouter>
        <CartWidget />
      </MemoryRouter>
    );
    const totalQuantity = queryByText("0");
    expect(totalQuantity).not.toBeInTheDocument();
  });

  // it('should navigate to the cart page when the cart icon button is clicked', () => {
  //   useCartContext.mockImplementation(() => ({
  //     getTotalQuantity: jest.fn(() => 0),
  //   }));

  //   const history = createMemoryHistory();
  //   const { getByRole } = render(
  //     <Router >
  //
  // <MemoryRouter>
  //   <CartWidget />
  // </MemoryRouter>;
  //     </Router>
  //   );
  //   const cartButton = getByRole('img');
  //   fireEvent.click(cartButton);

  //   expect(history.location.pathname).toBe('/cart');
  // });
});
