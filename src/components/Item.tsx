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

export interface IPropsCard {
  item: IItemCard;
  onAdd: (quantityToAdd: number) => void;
}

const Item = ({ item, onAdd }: IPropsCard) => {
  const { title, price, pictureUrl, stock, quantity, description, id } = item;
  return (
    <Card maxW="sm">
      <CardBody>
        <Link to={`/item/${id}`}>
          <Image
            src={pictureUrl}
            alt={title}
            borderRadius="lg"
            minH="168px"
            objectFit="cover"
          />
        </Link>
        <Stack mt="6" spacing="3">
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

export default Item;
