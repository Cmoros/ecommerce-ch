import { Box, SimpleGrid } from "@chakra-ui/react";
import ProductCard from "./Card";

interface IProps {
  greeting: string;
}

const ItemListContainer = ({ greeting }: IProps) => {
  return (
    <Box>
      {greeting}
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        <ProductCard
          stock={10}
          initial={2}
          onAdd={() => {
            console.log("Clicked on Add");
          }}
        />
        <ProductCard
          stock={20}
          initial={4}
          onAdd={() => {
            console.log("Clicked on Add");
          }}
        />
        <ProductCard
          stock={5}
          initial={1}
          onAdd={() => {
            console.log("Clicked on Add");
          }}
        />
      </SimpleGrid>
    </Box>
  );
};

export default ItemListContainer;
