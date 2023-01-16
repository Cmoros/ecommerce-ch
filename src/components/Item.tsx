import {
  Card,
  CardBody,
  Divider,
  CardFooter,
  Text,
  Image,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Item from "types/Item";
import ItemCount from "./ItemCount";
import { Link } from "react-router-dom";

export interface IItemCard extends Item {
  stock: number;
  initial: number;
}

export interface IPropsCard {
  item: IItemCard;
  onAdd: () => void;
}

const ProductCard = ({ item, onAdd }: IPropsCard) => {
  const { title, price, pictureUrl, stock, initial, description, id } = item;
  return (
    <Card maxW="sm">
      <CardBody>
        <Link to={`/item/${id}`}>
          <Image src={pictureUrl} alt={title} borderRadius="lg" />
        </Link>
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="green.500" fontSize="2xl" letterSpacing={-0.5}>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ItemCount stock={stock} initial={initial} onAdd={onAdd} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
