import { Button, useDisclosure } from "@chakra-ui/react";
import { useCartContext } from "context/cartContext";
import CheckoutModal from "layout/CheckoutModal";
import { Route, Routes } from "react-router-dom";

const TestRoute = () => {
  const { getCartList } = useCartContext();
  const cartList = getCartList();
  const disclosure = useDisclosure();
  return (
    <div>
      TestRoute
      <Routes>
        <Route path="/prueba" element={<p>Prueba</p>} />
      </Routes>
      <Button onClick={() => cartList[0].quantity++}>Hack</Button>
      <Button onClick={disclosure.onOpen}>Show Modal</Button>
      <CheckoutModal {...disclosure} id="hola" />
    </div>
  );
};

export default TestRoute;
