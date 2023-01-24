import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { checkIsItemCard } from "typescript/typeguards/Item";
import { IItemCard } from "typescript/types/Item";
import { useCartContext } from "./cartContext";

const cacheContext = createContext({
  getCache: () => ({} as typeof initialValue),
});

interface IProps {
  children: ReactNode;
}

const initialValue = {
  cartItems: [] as IItemCard[],
};

const cartItemsKey = "cartItems";

export const CacheProvider = ({ children }: IProps) => {
  const { getCartList, replaceCartItemList } = useCartContext();
  const [localCache, setLocalCache] = useState(initialValue);

  const setCache = (toCache: typeof initialValue) => {
    localStorage.setItem(cartItemsKey, JSON.stringify(toCache.cartItems));
    setLocalCache(toCache);
  };

  useEffect(() => {
    const cartItemsString = localStorage.getItem(cartItemsKey);
    if (!cartItemsString) return;
    try {
      const cartItemsFromCache = JSON.parse(cartItemsString);

      if (!Array.isArray(cartItemsFromCache)) {
        throw new Error("Items from cache are not what its expected");
      }

      // POSSIBLE PLACE FOR BUGS -> FIX
      const cartItemsToSet: IItemCard[] = cartItemsFromCache.reduce(
        (acc, item) => {
          if (checkIsItemCard(item)) acc.push(item);
          return acc;
        },
        []
      );
      replaceCartItemList(cartItemsToSet);
    } catch (e: unknown) {
      console.error("Error reading local storage:", e);
    }
  }, [replaceCartItemList]);

  useEffect(() => {
    setCache({ cartItems: getCartList() });
  }, [getCartList]);

  const getCache = () => localCache;
  return (
    <cacheContext.Provider value={{ getCache }}>
      {children}
    </cacheContext.Provider>
  );
};

export default cacheContext;

export const useCacheContext = () => useContext(cacheContext);
