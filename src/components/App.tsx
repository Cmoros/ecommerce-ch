import { Box, VStack } from "@chakra-ui/react";
import MainHeader from "layout/MainHeader";

const App = () => {
  return (
    <Box>
      <VStack minH="100vh" w="100vw" justifyContent="space-between">
        <MainHeader />
        <body>
          <p>My Body</p>
        </body>
        <footer>
          <p>My Footer</p>
        </footer>
      </VStack>
    </Box>
  );
};

export default App;
