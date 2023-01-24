import { Box, Heading } from "@chakra-ui/react";
import { useCategoryContext } from "context/categoryContext";
import ItemListContainer from "layout/ItemListContainer";
import { useParams } from "react-router-dom";
import { checkIsItemCategory } from "typescript/typeguards/Item";
import NotFoundPage from "./404";

const Category = () => {
  const { id } = useParams();
  const { getLabelByCategory } = useCategoryContext();

  if (!checkIsItemCategory(id))
    return <NotFoundPage>Category not found</NotFoundPage>;

  const headingText = getLabelByCategory(id);
  return (
    <Box w="full">
      <Heading as="h1">{headingText}</Heading>
      <ItemListContainer category={id} />
    </Box>
  );
};

export default Category;
