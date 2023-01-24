import { SimpleGrid } from "@chakra-ui/react";
import Item from "./Item";
import IItem, { IItemCard } from "typescript/types/Item";
import { useMemo } from "react";
import { useCartContext } from "context/cartContext";

interface IProps {
  items: IItem[];
  addItem: (newItem: IItemCard) => void;
}

const ItemList = ({ items }: IProps) => {
  console.log("rerender itemlist");
  const { addItem } = useCartContext();
  const itemsToPass = useMemo(
    () => items.map((item) => ({ ...item, quantity: 1 })),
    [items]
  );
  // const handleAddItem = useCallback(() => addItem, [addItem]);
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {itemsToPass.map((item) => (
        <Item item={item} addItem={addItem} key={item.id} />
      ))}
    </SimpleGrid>
  );
};

export default ItemList;
