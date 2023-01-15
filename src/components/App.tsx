import { Box, Container, VStack } from "@chakra-ui/react";
import MainHeader from "layout/MainHeader";
import ItemListContainer from "./ItemListContainer";

const App = () => {
  return (
    <Box>
      <VStack minH="100vh" w="100vw" justifyContent="space-between">
        <MainHeader />
        <Container m="auto" w="full" maxW="container.xl">
          <p>My Body</p>
          <ItemListContainer greeting="Esto es el ItemListContainer!" />
        </Container>
        <footer>
          <p>My Footer</p>
        </footer>
      </VStack>
    </Box>
  );
};

export default App;
