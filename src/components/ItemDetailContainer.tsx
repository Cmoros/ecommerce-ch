import { Box } from "@chakra-ui/react";
import { getItem } from "db/items";
import { useEffect, useState } from "react";
import IItem from "types/Item";
import FullSpinner from "./FullSpinner";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState<IItem | null>(null);

  useEffect(() => {
    getItem().then((newItem) => setItem(newItem));
  }, []);

  return (
    <Box>
      {!item ? (
        <FullSpinner />
      ) : (
        <ItemDetail item={{ ...item, stock: 10, initial: 1 }} />
      )}
    </Box>
  );
};

export default ItemDetailContainer;
