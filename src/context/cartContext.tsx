import { IItemCard } from "components/../typescript/types/Item";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from "react";

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
  // isInCart: (id: IItemCard["id"]) => {
  //   console.log("Default Context:", { id });
  // },
  getTotalQuantity: (): number => {
    return 0;
  },
  // updateQuantity: (id: IItemCard["id"], updated: number) => {
  //   console.log("Default Context", { id, updated });
  // },
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
  // getReadyToPay: (): boolean => {
  //   return false;
  // },
  // setReadyToPay: (isReadyToPay: boolean) => {
  //   console.log("Default set ready to pay", { isReadyToPay });
  // },
  replaceCartItemList: (cartItems: IItemCard[]): void =>
    console.log("Default cartItems:", cartItems),
});

type CartList = Record<IItemCard["id"], IItemCard>;

interface IProps {
  children: ReactNode;
  // initialState?: CartList;
}

export const CartContextProvider = ({ children }: IProps) => {
  const [cartList, setCartList] = useState<CartList>({});

  // const [isReadyToPay, setReadyToPay] = useState(false);

  // const getReadyToPay = () => isReadyToPay;

  const replaceCartItemList = useCallback((cartItems: IItemCard[]) => {
    const newCartList: CartList = {};
    for (const item of cartItems) {
      const { id } = item;
      newCartList[id] = item;
    }
    setCartList(newCartList);
  }, []);

  const isInCart = (cartList: CartList, id: IItemCard["id"]): boolean => {
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

  const addItem = useCallback((newItem: IItemCard): void => {
    const { id } = newItem;
    setCartList((old) => {
      const toAdd = newItem.quantity;
      let total: number;
      if (toAdd === 0) return old;
      const { stock } = newItem;
      if (isInCart(old, id)) {
        const { quantity } = old[id];
        if (quantity + toAdd > stock) {
          total = stock;
        } else if (quantity + toAdd < 1) {
          total = 1;
        } else {
          total = quantity + toAdd;
        }
        return {
          ...old,
          [id]: { ...newItem, quantity: total },
        };
      }
      if (toAdd < 0) return old;
      if (toAdd > stock) {
        newItem.quantity = stock;
      }
      return { ...old, [id]: newItem };
    });
  }, []);

  const removeItem = useCallback((id: IItemCard["id"]): void => {
    setCartList((old) => {
      const copy = { ...old };
      delete copy[id];
      return copy;
    });
  }, []);

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
        // updateQuantity,
        replaceCartItemList,
        addItem,
        getItem,
        removeItem,
        clear,
        // isInCart,
        getTotalQuantity,
        getTotalPrice,
        // getReadyToPay,
        // setReadyToPay,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default cartContext;

export const useCartContext = () => useContext(cartContext);
