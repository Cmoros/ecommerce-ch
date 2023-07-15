import { Container } from "@chakra-ui/react";
import FullSpinner from "components/FullSpinner";
import { useAuthContext } from "context/authContext";
// import { useCartContext } from "context/cartContext";
import CheckoutForm from "layout/CheckoutForm";
import PayWindow from "layout/PayWindow";
import { useCallback, useEffect, useState } from "react";
import { Client } from "typescript/types/Client";

const Checkout = () => {
  // const { setReadyToPay } = useCartContext();
  const { isAuthenticated, getUserInfo, isAuthtenticating } = useAuthContext();
  const [user, setUser] = useState<Client | null>(null);

  // useEffect(() => {
  //   return () => setReadyToPay(false);
  // }, [setReadyToPay]);

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
      {!user ? (
        <CheckoutForm onSubmit={handleSubmit} />
      ) : (
        <PayWindow user={user} />
      )}
    </Container>
  );
};

export default Checkout;
