import { Box } from "@chakra-ui/react";
import ItemList from "../components/ItemList";
import { useEffect, useState } from "react";
import IItem, { ItemCategory } from "typescript/types/Item";
import FullSpinner from "../components/FullSpinner";
import { getItemsByCategory } from "services/itemService";
import NotFoundPage from "pages/404";
import { useCartContext } from "context/cartContext";

interface IProps {
  category?: ItemCategory;
}

const ItemListContainer = ({ category }: IProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const { addItem } = useCartContext();
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

  if (isLoading) return <FullSpinner />;

  return (
    <Box w="full">
      {items.length === 0 ? (
        <NotFoundPage>No products found in this category</NotFoundPage>
      ) : (
        <ItemList items={items} addItem={addItem} />
      )}
    </Box>
  );
};

export default ItemListContainer;
