import { Box, Container, VStack } from "@chakra-ui/react";
import MainHeader from "layout/MainHeader";
import ItemDetailContainer from "./ItemDetailContainer";
import { Routes, Route } from "react-router-dom";
import ItemListContainer from "./ItemListContainer";

const App = () => {
  return (
    <Box>
      <VStack minH="100vh" w="100vw" justifyContent="space-between">
        <MainHeader />
        <Container m="auto" w="full" maxW="container.xl">
          {/* <p>My Body</p> */}
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="" />} />
            <Route path="/item/:id" element={<ItemDetailContainer />} />
            <Route
              path="/category/:id"
              element={<ItemListContainer greeting="" />}
            />
          </Routes>
        </Container>
        <Box
          as="footer"
          h={50}
          bgGradient="linear(to-b, red.200, red.500)"
          w="full"
        ></Box>
      </VStack>
    </Box>
  );
};

export default App;
