import { Alert, Box, Container, Link as ChakraLink } from "@chakra-ui/react";
import { useCartContext } from "context/cartContext";
import CheckoutForm from "layout/CheckoutForm";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { getReadyToPay, setReadyToPay } = useCartContext();

  useEffect(() => {
    return () => setReadyToPay(false);
  }, [setReadyToPay]);

  return (
    <Container>
      {!getReadyToPay() ? (
        <Box>
          <Alert>You can only access this page from cart!</Alert>
          <ChakraLink as={Link} to="/cart">
            Go back to cart{" "}
          </ChakraLink>
        </Box>
      ) : (
        <CheckoutForm />
      )}
    </Container>
  );
};

export default Checkout;
