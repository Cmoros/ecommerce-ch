import {
  Box,
  Text,
  Image,
  Flex,
  Heading,
  Badge,
  Divider,
  Stack,
  useMediaQuery,
  VStack,
  HStack,
} from "@chakra-ui/react";
import cartContext from "context/cartContext";
import { useContext, useState } from "react";
import GoToCartButton from "./GoToCartButton";
import { IItemCard } from "./Item";
import ItemCount from "./ItemCount";
import Price from "./Price";

interface IProps {
  item: IItemCard;
}

const ProductDetailPage = ({ item }: IProps) => {
  const [isNotMobile] = useMediaQuery("(min-width: 768px)");
  const { getItem } = useContext(cartContext);

  const [isReadyToBuy, setReadyToBuy] = useState(false);
  const { addItem } = useContext(cartContext);

  const { carbohydrates, protein, fat, calories, sugar } = item.nutritions;

  const onAdd = (quantityToAdd: number): void => {
    addItem({ ...item, quantity: quantityToAdd });
    setReadyToBuy(true);
  };

  const onCancel = (): void => {
    setReadyToBuy(false);
  };

  const ButtonToRender = () => {
    const cartItem = getItem(item.id);
    const quantityAdded = cartItem ? cartItem.quantity : 0;
    if (isReadyToBuy) {
      if (!quantityAdded) {
        console.warn(`☢Possible Bug☢: Item not found after adding`);
      }
      return (
        <GoToCartButton
          quantity={quantityAdded}
          total={quantityAdded * item.price}
          onCancel={onCancel}
        />
      );
    }
    return (
      <>
        <Text as="span">{quantityAdded || "None"} in Cart</Text>
        <ItemCount initial={1} stock={item.stock} onAdd={onAdd} />
      </>
    );
  };

  return (
    <Flex direction="column" align="center" mx="auto" px={4}>
      <Box w="100%" mb={4}>
        <Image
          src={item.pictureUrl}
          alt={item.title}
          w="100%"
          h={[`400px`, `500px`]}
          maxH="50vh"
          objectFit="cover"
        />
      </Box>
      <Stack
        w="100%"
        flexDir={{ base: "column", md: "row" }}
        gap={3}
        justifyContent="space-around"
      >
        <Box mb={4}>
          <Heading fontSize="3xl" fontWeight="bold" mb={2}>
            {item.title}
          </Heading>
          <HStack mb={2} flexWrap="wrap" gap={2}>
            <Badge>Carbohidratos: {carbohydrates}</Badge>
            <Badge bg="green.100">Proteinas: {protein}</Badge>
            <Badge bg="red.100">Grasa: {fat}</Badge>
            <Badge bg="purple.100">Calorias: {calories}</Badge>
            <Badge bg="cyan.100">Azucar: {sugar}</Badge>
          </HStack>
          <Divider />
          <Text fontSize="lg" color="gray.600" mb={2}>
            {item.description}
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis
            quaerat maiores doloremque fuga eius ut voluptates ratione, eligendi
            in saepe.
          </Text>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam
            accusantium veritatis obcaecati dicta similique consectetur, debitis
            ratione id deleniti corporis voluptatum expedita sapiente. Qui ex
            distinctio molestiae vero ab voluptate!
          </Text>
        </Box>
        <Box>
          <Divider orientation={`${isNotMobile ? "vertical" : "horizontal"}`} />
        </Box>
        <VStack alignSelf="center" minW={250} textAlign="center">
          <Text fontSize="lg" color="gray.600" mb={2}>
            Price: <Price ml={2}>{item.price}</Price>
          </Text>
          {item.stock === 0 ? (
            <Badge colorScheme="red" mb={4}>
              Out of Stock
            </Badge>
          ) : (
            <ButtonToRender />
          )}
        </VStack>
      </Stack>
    </Flex>
  );
};

export default ProductDetailPage;
