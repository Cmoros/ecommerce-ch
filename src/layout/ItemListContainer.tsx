import { Box } from "@chakra-ui/react";
import ItemList from "../components/ItemList";
import { fakeGet } from "db/items";
import { useEffect, useState } from "react";
import IItem, { Category } from "typescript/types/Item";
import FullSpinner from "../components/FullSpinner";

interface IProps {
  category?: Category;
}

const ItemListContainer = ({ category }: IProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    const queryCategory = category ? { category } : {};
    setLoading(true);
    fakeGet(queryCategory)
      .then((newItems) => {
        setItems(newItems);
      })
      .catch((e: unknown) => console.log("Error in Category Fetch:", e))
      .finally(() => setLoading(false));
    return () => setLoading(false);
  }, [category]);

  return <Box>{isLoading ? <FullSpinner /> : <ItemList items={items} />}</Box>;
};

export default ItemListContainer;
