import { fireEvent, renderHook, screen } from "@testing-library/react";
import CartItemList from "components/CartItemList";
import { CartContextProvider, useCartContext } from "context/cartContext";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import { doActHookMethod } from "utils/doActHookMethod";
import { initialState } from "__tests__/context/cartContext.test";

/* eslint-disable @typescript-eslint/no-explicit-any */
// jest.mock("context/cartContext.tsx");

const itemsArray = Object.values(initialState);

describe("CartItemList", () => {
  const generateWrapper = (base = initialState) =>
    function TestWrapper({ children }: { children: ReactNode }) {
      return (
        <BrowserRouter>
          <CartContextProvider initialState={base}>
            <CartItemList items={itemsArray} />
            {children}
          </CartContextProvider>
        </BrowserRouter>
      );
    };
  // const renderCartItemList = renderHook(useCartContext, { wrapper: wrapper() });

  it("should render all the items", async () => {
    // (useCartContext as any).mockImplementation(() => ({
    //   getTotalQuantity: jest.fn(() => 0),
    // }));
    renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const cartItems = screen.getAllByTestId(/^cartitem-id-/);
    expect(cartItems).toHaveLength(itemsArray.length);
    for (const id in initialState) {
      const item = screen.getByTestId(`cartitem-id-${id}`);
      expect(item).toBeInTheDocument();
      const title = item.querySelector("[data-testid=cartitem-title]");
      expect(title).toBeInTheDocument();
      expect(title).toHaveTextContent(initialState[id].title);
    }
  });

  it("should interact with context on updated item", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    const minusBtns = screen.getAllByTestId("minus-1");
    const addBtns = screen.getAllByTestId("add-1");

    const { quantity, id } = itemsArray[0];

    fireEvent.click(minusBtns[0]);
    expect(await hook("getItem", id)).toHaveProperty("quantity", quantity - 1);

    fireEvent.click(addBtns[0]);
    expect(await hook("getItem", id)).toHaveProperty("quantity", quantity);

    fireEvent.click(minusBtns[0]);
    expect(await hook("getItem", id)).toHaveProperty("quantity", quantity - 1);
  });

  it("shouldn't modify other cart items on update", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    const minusBtns = screen.getAllByTestId("minus-1");
    const addBtns = screen.getAllByTestId("add-1");

    const { quantity, id } = itemsArray[0];
    const otherQuantities = itemsArray
      .slice(1)
      .map(({ quantity, id }) => ({ quantity, id }));

    fireEvent.click(minusBtns[0]);
    expect(await hook("getItem", id)).toHaveProperty("quantity", quantity - 1);

    for (let i = 0; i < otherQuantities.length; i++) {
      const { id, quantity } = otherQuantities[i];
      expect(await hook("getItem", id)).toHaveProperty("quantity", quantity);
    }

    fireEvent.click(addBtns[0]);
    expect(await hook("getItem", id)).toHaveProperty("quantity", quantity);

    for (let i = 0; i < otherQuantities.length; i++) {
      const { id, quantity } = otherQuantities[i];
      expect(await hook("getItem", id)).toHaveProperty("quantity", quantity);
    }
  });

  it("shouldn't change it's items if clicking in full stock or in 1", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    const minusBtn = screen.getAllByTestId("minus-1")[1];
    const addBtn = screen.getAllByTestId("add-1")[2];

    const before = await hook("getCartList");

    fireEvent.click(minusBtn);
    expect(await hook("getCartList")).toEqual(before);

    fireEvent.click(addBtn);
    expect(await hook("getCartList")).toEqual(before);
  });

  it("should be able to remove products from cart", async () => {
    const { result } = renderHook(useCartContext, {
      wrapper: generateWrapper(),
    });
    const hook = doActHookMethod(result);

    const removeBtns = screen.getAllByTestId("cartitem-remove");

    for (let i = 0; i < removeBtns.length; i++) {
      const before = await hook("getCartList");
      fireEvent.click(removeBtns[i]);
      const cartList = await hook("getCartList");
      expect(cartList).not.toEqual(before);
      expect(cartList.length).toBeLessThan(before.length);
      expect(await hook("getItem", itemsArray[i].id)).toBeUndefined();
    }
  });
});
