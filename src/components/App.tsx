import { Box, Center, Container, VStack } from "@chakra-ui/react";
import MainHeader from "layout/MainHeader";
import { Routes, Route } from "react-router-dom";
import TestRoute from "pages/TestRoute";
import Home from "pages/Home";
import Category from "pages/Category";
import Detail from "pages/Detail";
import Cart from "pages/Cart";
import Checkout from "pages/Checkout";
import NotFoundPage from "pages/404";
import WishList from "pages/WishList";

const App = () => {
  return (
    <Box
      bg="fixed"
      bgImage="url(https://images.unsplash.com/photo-1610832958506-aa56368176cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)"
      bgRepeat="no-repeat"
      bgPosition="center"
      bgSize="cover"
    >
      <VStack
        minH="100vh"
        justifyContent="space-between"
        // overflowX="hidden"
        p={0}
        gap={0}
        spacing={0}
        position="relative"
      >
        <MainHeader />
        <Box
          w="full"
          bgGradient="linear(to-r, transparent, rgba(255,255,255, 0.75), rgba(255,255,255, 0.75), white, rgba(255,255,255, 0.75), rgba(255,255,255, 0.75), transparent)"
          flexGrow={1}
          display="flex"
          flexDir="column"
        >
          <Container
            m="auto"
            h="full"
            w="full"
            flexGrow={1}
            maxW="container.xl"
            py="10"
            bg="white"
          >
            <Center>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/item/:id" element={<Detail />} />
                <Route path="/category/:id" element={<Category />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/wishlist" element={<WishList />} />
                <Route path="/test/*" element={<TestRoute />} />
                <Route
                  path="/*"
                  element={
                    <NotFoundPage>
                      Sorry, the page you&apos;re looking for doesn&apos;t exist
                      or has been removed.
                    </NotFoundPage>
                  }
                />
              </Routes>
            </Center>
          </Container>
        </Box>
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
