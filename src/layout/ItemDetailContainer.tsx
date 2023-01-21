import { Box } from "@chakra-ui/react";
import { getItemById } from "db/firebase";
import { useEffect, useState } from "react";
import IItem from "typescript/types/Item";
import FullSpinner from "../components/FullSpinner";
import ItemDetail from "../components/ItemDetail";

const ItemDetailContainer = ({ id }: { id: string }) => {
  const [item, setItem] = useState<IItem | null>(null);
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getItemById(id)
      .then((newItem) => setItem(newItem))
      .catch((e: unknown) => console.error("Error consiguiendo el item", e))
      .finally(() => setLoading(false));
    return () => setLoading(false);
  }, [id]);
  if (isLoading) return <FullSpinner />;

  return (
    <Box>
      {!item ? (
        <p>No se encontró el producto</p>
      ) : (
        <ItemDetail item={{ ...item, quantity: 1 }} />
      )}
    </Box>
  );
};

export default ItemDetailContainer;
