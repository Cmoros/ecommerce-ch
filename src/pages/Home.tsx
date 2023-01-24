import { Box, Heading } from "@chakra-ui/react";
import ItemListContainer from "layout/ItemListContainer";

const Home = () => {
  return (
    <Box w="full">
      <Heading as="h1">Home</Heading>
      <ItemListContainer />
    </Box>
  );
};

export default Home;
