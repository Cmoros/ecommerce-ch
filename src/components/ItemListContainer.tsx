import { Box } from "@chakra-ui/react";
import ItemList from "./ItemList";
import { fakeFetch } from "db/items";
import { useEffect, useState } from "react";
import IItem from "types/Item";

interface IProps {
  greeting: string;
}

const ItemListContainer = ({ greeting }: IProps) => {
  const [items, setItems] = useState<IItem[]>([]);

  useEffect(() => {
    fakeFetch().then((newItems) => setItems(newItems));
  }, []);

  return (
    <Box>
      {greeting}
      <ItemList items={items} />
    </Box>
  );
};

export default ItemListContainer;
