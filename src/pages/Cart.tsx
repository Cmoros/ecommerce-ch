import { DeleteIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Button,
  Center,
  Container,
  Heading,
  Text,
  VStack,
  Link as ChakraLink,
  Flex,
} from "@chakra-ui/react";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CartItemList from "components/CartItemList";
import Price from "components/Price";
import { useCartContext } from "context/cartContext";
// import { useCallback } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const { getCartList, getTotalPrice, clear } = useCartContext();
  const cartList = getCartList();

  // const handlePay = useCallback((): void => {
  //   setReadyToPay(true);
  // }, [setReadyToPay]);

  if (cartList.length === 0)
    return (
      <Center
        flexDir="column"
        gap={5}
        m="auto"
        w="fit-content"
        h="100%"
        alignItems="center"
        justifyContent="center"
        data-testid="cart-empty"
      >
        <Alert status="info" fontSize="2xl">
          <AlertIcon />
          Cart is Empty... For Now
        </Alert>
        <Text fontSize="2xl">
          Go back{" "}
          <ChakraLink as={Link} to="/" color="red.700">
            Home Page <FontAwesomeIcon icon={faHome} />
          </ChakraLink>
        </Text>
      </Center>
    );

  return (
    <Container
      maxW="container.xl"
      borderWidth="1px"
      borderColor="red.400"
      w="full"
      borderRadius="2xl"
      p="calc(2px + 2vw)"
      data-testid="cart-page"
    >
      <Flex
        w="full"
        mb="8"
        textAlign="center"
        position="relative"
        flexDir={{ base: "column-reverse", md: "row" }}
        gap="3"
      >
        <Button
          position={{ md: "absolute", base: "relative" }}
          right="0"
          colorScheme="orange"
          alignSelf="flex-end"
          title="Empty Cart"
          rightIcon={<DeleteIcon />}
          onClick={clear}
        >
          Throw Basket
        </Button>
        <Heading>Your Basket</Heading>
      </Flex>
      <CartItemList
        items={cartList}
        // addItem={addItem}
        // removeItem={removeItem}
      />
      <Center mt="10">
        <VStack gap="2">
          <Heading fontSize="2xl" gap="5" display="flex">
            Total:{" "}
            <Price data-testid="cart-totalprice">{getTotalPrice()}</Price>
          </Heading>
          <Link
            to="/checkout"
            // onClick={handlePay}
          >
            <Button colorScheme="red">Pay Now</Button>
          </Link>
        </VStack>
      </Center>
    </Container>
  );
};

export default Cart;
