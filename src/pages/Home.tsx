import { Box, Heading } from "@chakra-ui/react";
import ItemListContainer from "components/ItemListContainer";

const Home = () => {
  return (
    <Box>
      <Heading as="h1">Home</Heading>
      <ItemListContainer greeting="" />
    </Box>
  );
};

export default Home;
