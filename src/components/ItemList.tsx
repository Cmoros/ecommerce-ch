import { SimpleGrid } from "@chakra-ui/react";
import Item from "./Item";
import IItem from "typescript/types/Item";

interface IProps {
  items: IItem[];
}

const ItemList = ({ items }: IProps) => {
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
          onAdd={() => {
            console.log(`Clicked on ${item.title} with id: ${item.id}`);
          }}
          key={item.id}
        />
      ))}
    </SimpleGrid>
  );
};

export default ItemList;
