import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Container,
  Heading,
  VStack,
} from "@chakra-ui/react";
import CartItem from "components/CartItem";
import Price from "components/Price";
import cartContext from "context/cartContext";
import { useContext } from "react";

const Cart = () => {
  const { getCartList, getTotalPrice } = useContext(cartContext);
  const cartList = getCartList();
  if (cartList.length === 0)
    return (
      <Center>
        <Alert status="info" fontSize="2xl">
          <AlertIcon />
          Cart is Empty... For Now
        </Alert>
      </Center>
    );
  return (
    <Container maxW="container.lg">
      <VStack spacing="4" gap={2}>
        {cartList.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </VStack>
      <Center mt="10">
        <VStack gap="2">
          <Heading fontSize="2xl" gap="5" display="flex">
            Total: <Price>{getTotalPrice()}</Price>
          </Heading>
          <Button colorScheme="red">Pay Now</Button>
        </VStack>
      </Center>
    </Container>
  );
};

export default Cart;
