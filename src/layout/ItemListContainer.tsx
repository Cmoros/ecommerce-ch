import { Box } from "@chakra-ui/react";
import ItemList from "../components/ItemList";
import { useEffect, useState } from "react";
import IItem, { Category } from "typescript/types/Item";
import FullSpinner from "../components/FullSpinner";
import { getItemsByCategory } from "services/itemService";

interface IProps {
  category?: Category;
}

const ItemListContainer = ({ category }: IProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getItemsByCategory(category || "")
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
