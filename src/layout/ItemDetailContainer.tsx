import { Box } from "@chakra-ui/react";
import { getItemById } from "services/itemService";
import { useEffect, useState } from "react";
import IItem from "typescript/types/Item";
import FullSpinner from "../components/FullSpinner";
import ItemDetail from "../components/ItemDetail";
import NotFoundPage from "pages/404";

const ItemDetailContainer = ({ id }: { id: string }) => {
  const [item, setItem] = useState<IItem | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    getItemById(id)
      .then((newItem) => setItem(newItem))
      .catch((e: unknown) =>
        console.error("Error getting the time with id:", id, e)
      )
      .finally(() => setLoading(false));
    return () => setLoading(false);
  }, [id]);
  if (isLoading) return <FullSpinner />;

  return (
    <Box w="full">
      {!item ? (
        <NotFoundPage>Product not Found</NotFoundPage>
      ) : (
        <ItemDetail item={{ ...item, quantity: 1 }} />
      )}
    </Box>
  );
};

export default ItemDetailContainer;
