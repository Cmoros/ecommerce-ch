import { CloseIcon } from "@chakra-ui/icons";
import {
  Card,
  CardBody,
  Heading,
  CardFooter,
  Image,
  Text,
  HStack,
  Divider,
  IconButton,
} from "@chakra-ui/react";
import { Link as ChakraLink } from "@chakra-ui/react";
import cartContext from "context/cartContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import CartItemCount from "./CartItemCount";
import { IItemCard } from "./Item";
import Price from "./Price";

interface IProps {
  item: IItemCard;
}

const CartItem = ({ item }: IProps) => {
  const { updateQuantity, removeItem } = useContext(cartContext);

  const { id, title, price, pictureUrl, quantity, stock } = item;

  const onChangeQuantity = (updated: number) => {
    updateQuantity(id, updated);
  };

  return (
    <Card
      direction="row"
      size="sm"
      overflow="hidden"
      variant="outline"
      w="full"
    >
      <Image
        objectFit="cover"
        maxW="200px"
        src={pictureUrl}
        alt={title}
        minW="0"
      />

      <HStack justifyContent="space-between" w="full">
        <CardBody>
          <ChakraLink as={Link} to={`/item/${id}`}>
            <Heading size="md">{title}</Heading>
          </ChakraLink>

          <Text py="2">
            {/* Caffè latte is a coffee beverage of Italian origin made with
            espresso and steamed milk. */}
          </Text>
        </CardBody>

        <Divider orientation="vertical" />

        <CardFooter
          flexDir="column"
          gap="1"
          justifyContent="center"
          alignItems="center"
          position="relative"
          h="full"
          pt="5"
        >
          <IconButton
            icon={<CloseIcon />}
            aria-label={""}
            position="absolute"
            top={0}
            right="0"
            size="xs"
            title="Remove from cart"
            colorScheme="red"
            onClick={() => removeItem(item.id)}
          />
          <Text>
            <Price fontSize="xl">{price}</Price> / u
          </Text>
          <Text>
            <Price fontSize="xl">{price * quantity}</Price>
          </Text>
          <CartItemCount
            quantity={quantity}
            stock={stock}
            onChange={onChangeQuantity}
          />
        </CardFooter>
      </HStack>
    </Card>
  );
};

export default CartItem;
