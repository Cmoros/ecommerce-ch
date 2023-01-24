import { SimpleGrid } from "@chakra-ui/react";
import Item from "./Item";
import IItem, { IItemCard } from "typescript/types/Item";
import { useCallback, useMemo } from "react";
import { useCartContext } from "context/cartContext";
import { useAuthContext } from "context/authContext";

interface IProps {
  items: IItem[];
  addItem: (newItem: IItemCard) => void;
}

const ItemList = ({ items }: IProps) => {
  console.log("rerender itemlist");
  const { addItem } = useCartContext();
  const { addLike, removeLike, getLikeList } = useAuthContext();
  const likeSet = useMemo(() => new Set([...getLikeList()]), [getLikeList]);
  const itemsToPass = useMemo(
    () => items.map((item) => ({ ...item, quantity: 1 })),
    [items]
  );

  const onLike = useCallback(
    (id: IItem["id"], liked: boolean): void => {
      if (liked) {
        addLike(id);
      } else {
        removeLike(id);
      }
    },
    [addLike, removeLike]
  );
  // const handleAddItem = useCallback(() => addItem, [addItem]);
  return (
    <SimpleGrid
      spacing={4}
      templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
    >
      {itemsToPass.map((item) => (
        <Item
          item={item}
          addItem={addItem}
          onLike={onLike}
          key={item.id}
          liked={likeSet.has(item.id)}
        />
      ))}
    </SimpleGrid>
  );
};

export default ItemList;
