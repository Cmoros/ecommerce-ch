import {
  Card,
  CardBody,
  Divider,
  CardFooter,
  Text,
  Image,
  Heading,
  Stack,
  Badge,
  Center,
} from "@chakra-ui/react";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";
import { IItemCard } from "../typescript/types/Item";
import { memo, useCallback } from "react";
import FavoriteButton from "./FavoriteButton";

export interface IPropsCard {
  item: IItemCard;
  addItem: (newItem: IItemCard) => void;
  onLike: (id: IItemCard["id"], liked: boolean) => void;
  liked: boolean;
}

const Item = ({ item, addItem, onLike, liked }: IPropsCard) => {
  console.log("rerender item", item.id);
  const { title, price, pictureUrl, stock, quantity, description, id } = item;

  const onAdd = useCallback(
    (quantityToAdd: number) => {
      addItem({ ...item, quantity: quantityToAdd });
    },
    [addItem, item]
  );

  const handleLike = (liked: boolean): void => {
    onLike(item.id, liked);
  };

  return (
    <Card size="sm" position="relative">
      <FavoriteButton active={liked} onLike={handleLike} />
      <CardBody>
        <Link to={`/item/${id}`}>
          <Image
            src={pictureUrl}
            alt={title}
            borderRadius="lg"
            h="calc(100px + 2vw)"
            w="full"
            objectFit="cover"
          />
        </Link>
        <Stack mt="calc(3px + 1vw)" spacing="calc(3px + 1vw)">
          <Link to={`/item/${id}`}>
            <Heading size="md">{title}</Heading>
          </Link>
          <Text>{description}</Text>
          <Text color="green.500" fontSize="2xl" letterSpacing={-0.5}>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        {item.stock === 0 ? (
          <Center w="full" h="full">
            <Badge colorScheme="red" mb={4} fontSize="lg">
              Out of Stock
            </Badge>
          </Center>
        ) : (
          <ItemCount stock={stock} initial={quantity} onAdd={onAdd} />
        )}
      </CardFooter>
    </Card>
  );
};

export default memo(Item);
