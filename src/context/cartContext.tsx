import { IItemCard } from "components/Item";
import React, { createContext, ReactNode, useState } from "react";

const cartContext = createContext({
  getCartList: (): IItemCard[] => {
    return [];
  },
  addItem: (newItem: IItemCard): void => {
    console.log("Default Context:", { newItem });
  },
  removeItem: (id: number) => {
    console.log("Default Context:", { id });
  },
  clear: () => {
    console.log("Default Context:");
  },
  isInCart: (id: number) => {
    console.log("Default Context:", { id });
  },
  getTotalQuantity: (): number => {
    return 0;
  },
  updateQuantity: (id: number, updated: number) => {
    console.log("Default Context", { id, updated });
  },
  getItem: (id: number): IItemCard | undefined => {
    return {
      name: "Default",
      title: "Default",
      quantity: -1,
      price: -1,
      stock: -1,
      pictureUrl: "default",
      category: "vegetable",
      id,
      description: "default",
      nutritions: {
        carbohydrates: -1,
        protein: -1,
        fat: -1,
        calories: -1,
        sugar: -1,
      },
    };
  },
  getTotalPrice: (): number => {
    return 0;
  },
});

interface IProps {
  children: ReactNode;
  initialState?: Record<number, IItemCard>;
}

export const CartContextProvider = ({ children, initialState }: IProps) => {
  const [cartList, setCartList] = useState<Record<number, IItemCard>>(
    initialState ?? {}
  );

  const isInCart = (id: number): boolean => {
    return Boolean(cartList[id]);
  };

  const getCartList = (): IItemCard[] => {
    return Object.values(cartList);
  };

  const getTotalPrice = (): number => {
    let total = 0;
    for (const id in cartList) {
      const item = cartList[id];
      total += item.quantity * item.price;
    }
    return total;
  };

  const getItem = (id: number): IItemCard | undefined => {
    return cartList[id];
  };

  const updateQuantity = (id: number, newQuantity: number): void => {
    const item = cartList[id];
    setCartList((old) => ({
      ...old,
      [id]: {
        ...item,
        quantity: Math.min(item.stock, newQuantity),
      },
    }));
  };

  const addItem = (newItem: IItemCard): void => {
    if (isInCart(newItem.id)) {
      const { quantity } = cartList[newItem.id];
      updateQuantity(newItem.id, quantity + newItem.quantity);
    } else {
      setCartList((old) => ({ ...old, [newItem.id]: newItem }));
    }
  };

  const removeItem = (id: number): void => {
    setCartList((old) => {
      const copy = { ...old };
      delete copy[id];
      return copy;
    });
  };

  const getTotalQuantity = (): number => {
    let total = 0;
    for (const id in cartList) {
      const item = cartList[id];
      total += item.quantity;
    }
    return total;
  };

  const clear = (): void => {
    setCartList({});
  };

  return (
    <cartContext.Provider
      value={{
        getCartList,
        updateQuantity,
        addItem,
        getItem,
        removeItem,
        clear,
        isInCart,
        getTotalQuantity,
        getTotalPrice,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;
