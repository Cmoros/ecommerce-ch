import { Box, Heading } from "@chakra-ui/react";
import ItemListContainer from "components/ItemListContainer";
import { useParams } from "react-router-dom";
import { checkCategory } from "typescript/typeguards/Item";

const Category = () => {
  const { id } = useParams();
  return (
    <Box>
      <Heading as="h1">Home</Heading>
      {checkCategory(id) && <ItemListContainer category={id} greeting="" />}
    </Box>
  );
};

export default Category;
