import { renderHook, screen } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "context/cartContext";
import Cart from "pages/Cart";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { doActHookMethod } from "utils/doActHookMethod";
import { initialState } from "__tests__/context/cartContext.test";

describe("Cart", () => {
  const generateWrapper = (base = initialState) =>
    function TestWrapper({ children }: { children: ReactNode }) {
      return (
        <BrowserRouter>
          <CartContextProvider initialState={base}>
            <Cart />
            {children}
          </CartContextProvider>
        </BrowserRouter>
      );
    };

  it("can render empty car", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper({}),
    });
    const hook = doActHookMethod(result);

    expect(await hook("getCartList")).toHaveLength(0);

    const emptyCart = screen.getByTestId("cart-empty");
    const pageCart = screen.queryByTestId("cart-page");

    expect(emptyCart).toBeInTheDocument();
    expect(pageCart).not.toBeInTheDocument();
  });

  it("should render page when at least 1 product", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    expect((await hook("getCartList")).length).toBeGreaterThan(0);

    const emptyCart = screen.queryByTestId("cart-empty");
    const pageCart = screen.getByTestId("cart-page");

    expect(emptyCart).not.toBeInTheDocument();
    expect(pageCart).toBeInTheDocument();
  });

  it("should render total price correctly", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    const totalPriceEl = screen.getByTestId("cart-totalprice");
    let totalPrice = await hook("getTotalPrice");
    expect(totalPriceEl).toHaveTextContent(totalPrice + "");

    const id = Object.keys(initialState)[0];
    await hook("removeItem", id);
    totalPrice = await hook("getTotalPrice");
    expect(totalPriceEl).toHaveTextContent(totalPrice + "");

    await hook("addItem", initialState[id]);
    totalPrice = await hook("getTotalPrice");
    expect(totalPriceEl).toHaveTextContent(totalPrice + "");
  });

  it("should remove all from cart in trash button and change view", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    let pageCart = screen.getByTestId("cart-page");
    expect(pageCart).toBeInTheDocument();

    await hook("clear");

    let emptyCart = screen.getByTestId("cart-empty");
    expect(emptyCart).toBeInTheDocument();
    expect(pageCart).not.toBeInTheDocument();

    const id = Object.keys(initialState)[0];
    await hook("addItem", initialState[id]);

    pageCart = screen.getByTestId("cart-page");
    expect(pageCart).toBeInTheDocument();
    expect(emptyCart).not.toBeInTheDocument();

    const totalPriceEl = screen.getByTestId("cart-totalprice");
    const totalPrice = await hook("getTotalPrice");
    expect(totalPriceEl).toHaveTextContent(totalPrice + "");

    await hook("removeItem", id);
    emptyCart = screen.getByTestId("cart-empty");
    expect(pageCart).not.toBeInTheDocument();
    expect(emptyCart).toBeInTheDocument();
  });

  it("should update CartItemList on cartlist update", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    const cartList = await hook("getCartList");
    let cartItems = screen.getAllByTestId(/^cartitem-id-/);

    expect(cartItems).toHaveLength(cartList.length);

    for (let i = 0; i < cartList.length; i++) {
      expect(
        screen.getByTestId(`cartitem-id-${cartList[i].id}`)
      ).toBeInTheDocument();
    }

    await hook("removeItem", cartList[0].id);

    cartItems = screen.getAllByTestId(/^cartitem-id-/);
    expect(await hook("getCartList")).toHaveLength(cartItems.length);

    expect(
      screen.queryByTestId(`cartitem-id-${cartList[0].id}`)
    ).not.toBeInTheDocument();
    for (let i = 1; i < cartList.length; i++) {
      expect(
        screen.getByTestId(`cartitem-id-${cartList[i].id}`)
      ).toBeInTheDocument();
    }

    await hook("addItem", cartList[0]);

    cartItems = screen.getAllByTestId(/^cartitem-id-/);
    expect(await hook("getCartList")).toHaveLength(cartList.length);
    for (let i = 0; i < cartList.length; i++) {
      expect(
        screen.getByTestId(`cartitem-id-${cartList[i].id}`)
      ).toBeInTheDocument();
    }
  });
});
