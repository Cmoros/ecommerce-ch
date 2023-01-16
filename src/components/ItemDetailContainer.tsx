import { Box } from "@chakra-ui/react";
import { getItem } from "db/items";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IItem from "types/Item";
import FullSpinner from "./FullSpinner";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const [item, setItem] = useState<IItem | null>(null);
  const { id } = useParams();

  useEffect(() => {
    getItem(id).then((newItem) => setItem(newItem));
  }, [id]);

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
