import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "components/App";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "context/cartContext";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ChakraProvider>
  </BrowserRouter>
);
