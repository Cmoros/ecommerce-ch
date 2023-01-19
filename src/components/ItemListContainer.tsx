import { Box } from "@chakra-ui/react";
import ItemList from "./ItemList";
import { fakeGet } from "db/items";
import { useEffect, useState } from "react";
import IItem, { Category } from "typescript/types/Item";

interface IProps {
  greeting: string;
  category?: Category;
}

const ItemListContainer = ({ greeting, category }: IProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  useEffect(() => {
    fakeGet(category ? { category } : {}).then((newItems) =>
      setItems(newItems)
    );
  }, [category]);

  return (
    <Box>
      {greeting}
      <ItemList items={items} />
    </Box>
  );
};

export default ItemListContainer;
