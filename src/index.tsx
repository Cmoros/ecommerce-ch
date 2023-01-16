import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import App from "components/App";
import { BrowserRouter } from "react-router-dom";

const container = document.getElementById("root") as HTMLDivElement;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
