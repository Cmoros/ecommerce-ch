import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "components/App";
import { BrowserRouter } from "react-router-dom";
import { CartContextProvider } from "context/cartContext";
import {} from "./db/firebase";
import { CategoryContextProvider } from "context/categoryContext";
import { CacheProvider } from "context/cacheContext";
import { AuthProvider } from "context/authContext";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <AuthProvider>
        <CategoryContextProvider>
          <CartContextProvider>
            <CacheProvider>
              <App />
            </CacheProvider>
          </CartContextProvider>
        </CategoryContextProvider>
      </AuthProvider>
    </ChakraProvider>
  </BrowserRouter>
);
