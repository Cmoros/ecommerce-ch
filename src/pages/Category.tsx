import { Box, Heading } from "@chakra-ui/react";
import ItemListContainer from "layout/ItemListContainer";
import { getLabelByCategory } from "constants/navBarLinks";
import { useParams } from "react-router-dom";
import { checkCategory } from "typescript/typeguards/Item";

const Category = () => {
  const { id } = useParams();
  if (!checkCategory(id))
    return (
      <Box>
        <Heading as="h1">Categoría no encontrada</Heading>
      </Box>
    );

  const headingText = getLabelByCategory(id);
  return (
    <Box>
      <Heading as="h1">{headingText}</Heading>
      <ItemListContainer category={id} />
    </Box>
  );
};

export default Category;
