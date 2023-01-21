import { SimpleGrid } from "@chakra-ui/react";
import Item from "./Item";
import IItem from "typescript/types/Item";
import { useCartContext } from "context/cartContext";

interface IProps {
  items: IItem[];
}

const ItemList = ({ items }: IProps) => {
  const { addItem } = useCartContext();

  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {items.map((item) => (
        <Item
          item={{
            ...item,
            quantity: 1,
          }}
          onAdd={(quantityToAdd: number) => {
            addItem({ ...item, quantity: quantityToAdd });
          }}
          key={item.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default ItemList;
