import { Box } from "@chakra-ui/react";
import { getItem } from "db/items";
import { useEffect, useState } from "react";
import IItem from "typescript/types/Item";
import FullSpinner from "./FullSpinner";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = ({ id }: { id: string }) => {
  const [item, setItem] = useState<IItem | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    try {
      getItem(id).then((newItem) => setItem(newItem));
    } catch (e: unknown) {
      console.error("Error la búsqueda del item:", e);
    } finally {
      setLoading(false);
    }
    return () => setLoading(false);
  }, [id]);
  if (isLoading)
    return (
      <Box>
        <FullSpinner />
      </Box>
    );

  return (
    <Box>
      {!item ? (
        <p>No se encontró el producto</p>
      ) : (
        <ItemDetail item={{ ...item, stock: 10, initial: 1 }} />
      )}
    </Box>
  );
};

export default ItemDetailContainer;
