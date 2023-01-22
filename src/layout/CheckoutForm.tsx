import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Center,
  Text,
  useDisclosure,
  Box,
  useToast,
} from "@chakra-ui/react";
import FullSpinner from "components/FullSpinner";
import Price from "components/Price";
import { useCartContext } from "context/cartContext";
import { FormEvent, useCallback, useState } from "react";
import { addNewPurchase, PrePurchase } from "services/purchaseService";
import { checkIsClient } from "typescript/typeguards/Client";
import { Purchase } from "typescript/types/Purchase";
import { getDataFromForm } from "utils";
import CheckoutModal from "./CheckoutModal";

const CheckoutForm = () => {
  const { getCartList, getTotalPrice, clear: clearCart } = useCartContext();
  const [isLoading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [purchaseId, setPurchaseid] = useState<Purchase["id"]>("");
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { target } = e;
      if (!(target instanceof HTMLFormElement)) return;
      const formData = getDataFromForm(target);
      const cartList = getCartList();
      const itemsToPurchase = cartList.map(({ id, price, quantity }) => ({
        id,
        price,
        quantity,
      }));
      if (!checkIsClient(formData)) {
        console.error("Form data is not type client");
        return;
      }

      const prePurchase: PrePurchase = {
        items: itemsToPurchase,
        buyer: formData,
      };
      setLoading(true);
      try {
        const purchase = await addNewPurchase(prePurchase);
        console.info(purchase);
        target.reset();
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
    },
    [getCartList, clearCart, onOpen, toast]
  );

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <VStack>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="name" name="name" isRequired />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email"
              name="email"
              // type="email"
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input placeholder="+54 1234 5678" name="phone" isRequired />
          </FormControl>
        </VStack>
        <Center flexDir="column" mt={4} gap="4">
          <Text>
            Total: <Price>{getTotalPrice()}</Price>
          </Text>
          <Button colorScheme="green" type="submit" px="10" size="lg">
            Pay
          </Button>
        </Center>
        <Box w="full" h="50px" mt={4}>
          {isLoading && <FullSpinner />}
        </Box>
      </form>
      <CheckoutModal id={purchaseId} isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default CheckoutForm;
