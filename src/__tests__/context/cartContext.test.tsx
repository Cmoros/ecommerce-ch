import { renderHook } from "@testing-library/react";
import { CartContextProvider, useCartContext } from "context/cartContext";
import { ReactNode } from "react";
import { act } from "react-dom/test-utils";
import { IItemCard } from "typescript/types/Item";

describe("CartContextProvider", () => {
  const testItem: IItemCard = {
    id: "item1",
    name: "Test Item",
    title: "Test Title",
    quantity: 1,
    price: 10,
    stock: 5,
    pictureUrl: "test.jpg",
    category: "grain",
    description: "Test description",
    nutritions: {
      carbohydrates: 0,
      protein: 0,
      fat: 0,
      calories: 0,
      sugar: 0,
    },
  };

  const testItem2: IItemCard = {
    id: "item2",
    name: "Test Item",
    title: "Test Title",
    quantity: 1,
    price: 10,
    stock: 5,
    pictureUrl: "test.jpg",
    category: "grain",
    description: "Test description",
    nutritions: {
      carbohydrates: 0,
      protein: 0,
      fat: 0,
      calories: 0,
      sugar: 0,
    },
  };

  const testItem3: IItemCard = {
    id: "item3",
    name: "Test Item",
    title: "Test Title",
    quantity: 1,
    price: 10,
    stock: 5,
    pictureUrl: "test.jpg",
    category: "grain",
    description: "Test description",
    nutritions: {
      carbohydrates: 0,
      protein: 0,
      fat: 0,
      calories: 0,
      sugar: 0,
    },
  };

  // const itemArray = [testItem, testItem2];

  const wrapper = ({ children }: { children: ReactNode }) => (
    <CartContextProvider>{children} </CartContextProvider>
  );

  const doActHookMethod = <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends Record<string, (...args: any[]) => any>
  >(result: {
    current: T;
  }) => {
    return async <Z extends keyof T>(
      method: Z,
      ...params: Parameters<T[Z]>
    ): Promise<ReturnType<T[Z]>> => {
      const fn = result.current[method];
      return act(() => fn(...params));
    };
  };

  it("should add item to cart", async () => {
    const { result } = renderHook(() => useCartContext(), {
      wrapper,
    });

    let list = await act(() => result.current.getCartList());
    expect(list).toHaveLength(0);

    act(() => result.current.addItem(testItem));

    list = await act(() => result.current.getCartList());
    expect(list).toHaveLength(1);
    const itemRef1 = list[0];

    const itemRef2 = await act(() => result.current.getItem(testItem.id));
    expect(itemRef2).toBeTruthy();
    expect(itemRef2!.id).toBe(testItem.id);

    expect(itemRef1).toBe(itemRef2);

    expect(testItem).toEqual(itemRef1);
  });

  it("should add many items", async () => {
    const { result } = renderHook(useCartContext, { wrapper });

    const hook = doActHookMethod(result);

    await hook("addItem", testItem);
    await hook("addItem", testItem2);

    const list = await hook("getCartList");
    expect(list).toHaveLength(2);

    const item1 = await hook("getItem", testItem.id);
    const item2 = await hook("getItem", testItem2.id);

    expect(item1).toEqual(testItem);
    expect(item2).toEqual(testItem2);
  });

  it("can't add the same many times", async () => {
    const { result } = renderHook(useCartContext, { wrapper });

    const hook = doActHookMethod(result);

    await hook("addItem", testItem);
    await hook("addItem", testItem2);

    let list = await hook("getCartList");
    expect(list).toHaveLength(2);

    await hook("addItem", testItem);
    await hook("addItem", testItem2);

    list = await hook("getCartList");
    expect(list).toHaveLength(2);
  });

  it("should remove item from cart", async () => {
    const { result } = renderHook(useCartContext, { wrapper });

    act(() => result.current.addItem(testItem));
    act(() => result.current.removeItem(testItem.id));

    const list = await act(result.current.getCartList);
    expect(list).toHaveLength(0);
  });

  it("should calculate total price and quantity of items in cart", async () => {
    const { result } = renderHook(useCartContext, { wrapper });
    const hook = doActHookMethod(result);
    let price = await hook("getTotalPrice");
    let quantity = await hook("getTotalQuantity");
    expect(price).toBe(0);
    expect(quantity).toBe(0);

    await hook("addItem", testItem);

    price = await hook("getTotalPrice");
    quantity = await hook("getTotalQuantity");
    expect(price).toBe(10);
    expect(quantity).toBe(1);

    await hook("removeItem", testItem.id);
    price = await hook("getTotalPrice");
    quantity = await hook("getTotalQuantity");
    expect(price).toBe(0);
    expect(quantity).toBe(0);
  });

  it("should clear all items from cart", async () => {
    const { result } = renderHook(useCartContext, { wrapper });
    const hook = doActHookMethod(result);

    await hook("addItem", testItem);
    await hook("clear");

    const list = await hook("getCartList");
    const item = await hook("getItem", testItem.id);
    expect(list).toHaveLength(0);
    expect(item).toBeUndefined();

    await hook("addItem", testItem);
    await hook("addItem", testItem2);
  });

  it("should replace the cart item list", async () => {
    const { result } = renderHook(useCartContext, { wrapper });
    const hook = doActHookMethod(result);

    const arr = [testItem2, testItem3];

    await hook("addItem", testItem);

    const before = await hook("getCartList");

    await hook("replaceCartItemList", arr);
    const after = await hook("getCartList");
    expect(before).not.toEqual(after);
    expect(after).toHaveLength(arr.length);
    expect(await hook("getItem", testItem2.id)).toEqual(testItem2);
    expect(await hook("getItem", testItem3.id)).toEqual(testItem3);

    const item1 = await hook("getItem", testItem.id);
    expect(item1).toBeUndefined();
  });

  it("doesn't add if quantity of adding is 0 or lesser", async () => {
    const { result } = renderHook(useCartContext, { wrapper });
    const hook = doActHookMethod(result);

    await hook("addItem", testItem);

    const before = await hook("getCartList");

    const otherItem = { ...testItem2, quantity: 0 };

    await hook("addItem", otherItem);
    let item = await hook("getItem", otherItem.id);
    const after1 = await hook("getCartList");

    expect(after1).toEqual(before);
    expect(item).toBeUndefined();

    const otherItem2 = { ...testItem3, quantity: -4 };
    await hook("addItem", otherItem2);
    item = await hook("getItem", otherItem2.id);
    const after2 = await hook("getCartList");
    expect(item).toBeUndefined();
    expect(after2).toEqual(before);

    expect(before).toHaveLength(1);
    expect(await hook("getItem", testItem.id)).toEqual(testItem);
  });

  it("'s products doesn't go lower than 1 or higher than stock", async () => {
    const { result } = renderHook(useCartContext, { wrapper });
    const hook = doActHookMethod(result);

    await hook("addItem", testItem);

    await hook("addItem", { ...testItem, quantity: 999 });
    let item1 = await hook("getItem", testItem.id);
    expect(item1?.quantity).toBe(testItem.stock);

    const otherItem = { ...testItem2, quantity: 999 };

    await hook("addItem", otherItem);
    const item2 = await hook("getItem", otherItem.id);
    expect(item2?.quantity).toBe(testItem2.stock);

    await hook("addItem", { ...testItem, quantity: -999 });
    item1 = await hook("getItem", testItem.id);
    expect(item1?.quantity).toBe(1);
  });

  it("'s default value works properly", async () => {
    const { result } = renderHook(useCartContext);
    const hook = doActHookMethod(result);
    expect(await hook("addItem", testItem)).toBeUndefined();
    expect(await hook("getCartList")).toEqual([]);
    expect(await hook("removeItem", testItem.id)).toBeUndefined();
    expect(await hook("clear")).toBeUndefined();
    expect(await hook("getItem", "")).toEqual({
      name: "Default",
      title: "Default",
      quantity: -1,
      price: -1,
      stock: -1,
      pictureUrl: "default",
      category: "vegetable",
      id: "",
      description: "default",
      nutritions: {
        carbohydrates: -1,
        protein: -1,
        fat: -1,
        calories: -1,
        sugar: -1,
      },
    });
    expect(await hook("getTotalPrice")).toBe(0);
    expect(await hook("getTotalQuantity")).toBe(0);
    expect(await hook("replaceCartItemList", [])).toBeUndefined();
  });
});
