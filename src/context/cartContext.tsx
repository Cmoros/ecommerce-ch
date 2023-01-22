import { IItemCard } from "components//../typescript/types/Item";
import React, { createContext, ReactNode, useContext, useState } from "react";

const cartContext = createContext({
  getCartList: (): IItemCard[] => {
    return [];
  },
  addItem: (newItem: IItemCard): void => {
    console.log("Default Context:", { newItem });
  },
  removeItem: (id: IItemCard["id"]) => {
    console.log("Default Context:", { id });
  },
  clear: () => {
    console.log("Default Context:");
  },
  isInCart: (id: IItemCard["id"]) => {
    console.log("Default Context:", { id });
  },
  getTotalQuantity: (): number => {
    return 0;
  },
  updateQuantity: (id: IItemCard["id"], updated: number) => {
    console.log("Default Context", { id, updated });
  },
  getItem: (id: IItemCard["id"]): IItemCard | undefined => {
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
  getReadyToPay: (): boolean => {
    return false;
  },
  setReadyToPay: (isReadyToPay: boolean) => {
    console.log("Default set ready to pay", { isReadyToPay });
  },
});

interface IProps {
  children: ReactNode;
  initialState?: Record<number, IItemCard>;
}

export const CartContextProvider = ({ children, initialState }: IProps) => {
  const [cartList, setCartList] = useState<Record<IItemCard["id"], IItemCard>>(
    initialState ?? {}
  );

  const [isReadyToPay, setReadyToPay] = useState(false);

  const getReadyToPay = () => isReadyToPay;

  const isInCart = (id: IItemCard["id"]): boolean => {
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

  const getItem = (id: IItemCard["id"]): IItemCard | undefined => {
    return cartList[id];
  };

  const updateQuantity = (id: IItemCard["id"], newQuantity: number): void => {
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

  const removeItem = (id: IItemCard["id"]): void => {
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
        getReadyToPay,
        setReadyToPay,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;

export const useCartContext = () => useContext(cartContext);
