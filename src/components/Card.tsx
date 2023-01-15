import { Card, CardBody, Divider, CardFooter, Text } from "@chakra-ui/react";
import ItemCount from "./ItemCount";

export interface IPropsCard {
  stock: number;
  initial: number;
  onAdd: () => void;
}

const ProductCard = ({ stock, initial, onAdd }: IPropsCard) => {
  return (
    <Card maxW="sm">
      <CardBody>
        <Text>Esto es una card con un producto</Text>
      </CardBody>
      <Divider />
      <CardFooter>
        <ItemCount stock={stock} initial={initial} onAdd={onAdd} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
