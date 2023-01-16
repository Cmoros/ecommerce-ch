import { Box } from "@chakra-ui/react";
import ItemList from "./ItemList";
import { fakeGet } from "db/items";
import { useEffect, useState } from "react";
import IItem from "types/Item";
import { useParams } from "react-router-dom";

interface IProps {
  greeting: string;
}

const ItemListContainer = ({ greeting }: IProps) => {
  const [items, setItems] = useState<IItem[]>([]);
  const { id } = useParams();
  useEffect(() => {
    fakeGet(id).then((newItems) => setItems(newItems));
  }, [id]);

  return (
    <Box>
      {greeting}
      <ItemList items={items} />
    </Box>
  );
};

export default ItemListContainer;
