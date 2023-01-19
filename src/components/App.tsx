import { Box, Container, VStack } from "@chakra-ui/react";
import MainHeader from "layout/MainHeader";
import { Routes, Route } from "react-router-dom";
import TestRoute from "pages/TestRoute";
import Home from "pages/Home";
import Category from "pages/Category";
import Detail from "pages/Detail";

const App = () => {
  return (
    <Box>
      <VStack
        minH="100vh"
        justifyContent="space-between"
        overflowX="hidden"
        padding={0}
      >
        <MainHeader />
        <Container m="auto" w="full" maxW="container.xl" py="10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/item/:id" element={<Detail />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/test/*" element={<TestRoute />} />
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
