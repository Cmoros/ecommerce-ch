import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import FullSpinner from "components/FullSpinner";
import Price from "components/Price";
import { useCartContext } from "context/cartContext";
import { useState } from "react";
import { addNewPurchase, PrePurchase } from "services/purchaseService";
import { Client } from "typescript/types/Client";
import { Purchase } from "typescript/types/Purchase";
import CheckoutModal from "./CheckoutModal";

interface IProps {
  user: Client;
}

const PayWindow = ({ user }: IProps) => {
  const { getCartList, getTotalPrice, clear: clearCart } = useCartContext();
  const [isLoading, setLoading] = useState(false);
  const { email, name, phone } = user;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [purchaseId, setPurchaseid] = useState<Purchase["id"]>("");
  const toast = useToast();

  const handlePay = async () => {
    const cartList = getCartList();
    const itemsToPurchase = cartList.map(({ id, price, quantity }) => ({
      id,
      price,
      quantity,
    }));
    const prePurchase: PrePurchase = {
      items: itemsToPurchase,
      buyer: user,
    };
    setLoading(true);
    try {
      const purchase = await addNewPurchase(prePurchase);
      console.info(purchase);
      setPurchaseid(purchase.id);
      clearCart();
      onOpen();
    } catch (e) {
      console.error("Error adding purchase in checkout:", e);
      toast({
        status: "error",
        title: "Purchase Error",
        variant: "subtle",
        isClosable: true,
        description: "There was an error with the purchase. Try again later",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Box>
      <Center flexDir="column" gap={4}>
        <Heading>You&apos;re about to pay as:</Heading>

        <Text>Name: {name}</Text>
        <Text>Email: {email}</Text>
        <Text>Phone: {phone}</Text>
        <Text>
          Total: <Price>{getTotalPrice()}</Price>
        </Text>
        <Button
          colorScheme="green"
          type="submit"
          px="10"
          size="lg"
          onClick={handlePay}
        >
          Pay
        </Button>
        <Box w="full" h="50px" mt={4}>
          {isLoading && <FullSpinner />}
        </Box>
      </Center>
      <CheckoutModal id={purchaseId} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default PayWindow;
