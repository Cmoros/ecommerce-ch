import { SimpleGrid } from "@chakra-ui/react";
import { useCartContext } from "context/cartContext";
import { IItemCard } from "typescript/types/Item";
import CartItem from "./CartItem";

interface IProps {
  items: IItemCard[];
  // addItem: (item: IItemCard) => void;
  // removeItem: (id: IItemCard["id"]) => void;
}

const CartItemList = ({ items }: IProps) => {
  console.log("list");
  const { addItem, removeItem } = useCartContext();
  return (
    <SimpleGrid spacing="4" gap={4} columns={{ base: 1, lg: 2 }}>
      {items.map((item) => (
        <CartItem
          item={item}
          key={item.id}
          onUpdate={addItem}
          onRemove={removeItem}
        />
      ))}
    </SimpleGrid>
  );
};

export default CartItemList;
