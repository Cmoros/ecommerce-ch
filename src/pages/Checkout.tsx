import { Alert, Box, Container, Link as ChakraLink } from "@chakra-ui/react";
import FullSpinner from "components/FullSpinner";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import { getResults } from "db/firebase";
import CheckoutForm from "layout/CheckoutForm";
import PayWindow from "layout/PayWindow";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Client, defaultUser } from "typescript/types/Client";

const Checkout = () => {
  const { getReadyToPay, setReadyToPay } = useCartContext();
  const { isAuthenticated, getUserInfo, login, logout, isAuthtenticating } =
    useAuthContext();
  const [user, setUser] = useState<Client | null>(null);

  useEffect(() => {
    return () => setReadyToPay(false);
  }, [setReadyToPay]);

  useEffect(() => {
    const userLoggedIn = getUserInfo();
    if (isAuthenticated && userLoggedIn) {
      setUser(userLoggedIn);
    } else {
      setUser(null);
    }
  }, [getUserInfo, isAuthenticated]);

  const handleSubmit = useCallback((user: Client) => {
    setUser(user);
  }, []);

  if (isAuthtenticating)
    return (
      <Container>
        <FullSpinner />
      </Container>
    );

  return (
    <Container>
      {
        // !getReadyToPay() ? (
        //   <Box>
        //     <Alert>You can only access this page from cart!</Alert>
        //     <ChakraLink as={Link} to="/cart">
        //       Go back to cart{" "}
        //     </ChakraLink>
        //   </Box>
        // ) :
        !user ? (
          <CheckoutForm onSubmit={handleSubmit} />
        ) : (
          <PayWindow user={user} />
        )
      }
    </Container>
  );
};

export default Checkout;
