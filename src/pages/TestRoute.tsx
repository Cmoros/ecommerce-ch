import { Button } from "@chakra-ui/react";
import { useCartContext } from "context/cartContext";
import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";

const TestRoute = () => {
  const { getCartList } = useCartContext();
  const cartList = getCartList();
  return (
    <div>
      TestRoute
      <Routes>
        <Route path="/prueba" element={<p>Prueba</p>} />
      </Routes>
      <Button onClick={() => cartList[0].quantity++}>Hack</Button>
    </div>
  );
};

export default TestRoute;
