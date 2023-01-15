import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { IPropsCard } from "./Card";

const ItemCount = ({
  stock,
  initial,
  onAdd,
}: Pick<IPropsCard, "initial" | "onAdd" | "stock">) => {
  const [quantity, setQuantity] = useState(initial);
  const handleAdd = (toAdd: number) => {
    if (quantity === stock) return;
    if (quantity + toAdd >= stock) {
      setQuantity(stock);
      return;
    }
    setQuantity((old) => old + toAdd);
  };

  const handleSubstract = (toSubstract: number) => {
    if (quantity === 1) return;
    if (quantity - toSubstract <= 1) {
      setQuantity(1);
      return;
    }
    setQuantity((old) => old - toSubstract);
  };

  return (
    <VStack w="full" justifyContent="center" spacing={3}>
      <ButtonGroup
        w="full"
        maxW={175}
        bg="red.100"
        justifyContent="space-between"
        alignItems="center"
      >
        <IconButton
          icon={<MinusIcon />}
          colorScheme="red"
          aria-label={"minus 1"}
          onClick={() => handleSubstract(1)}
        />
        <Text>{quantity}</Text>
        <IconButton
          icon={<AddIcon />}
          colorScheme="red"
          aria-label={"add 1"}
          onClick={() => handleAdd(1)}
        />
      </ButtonGroup>
      <Button
        colorScheme="red"
        textAlign="center"
        maxW={175}
        onClick={onAdd}
        rightIcon={<FontAwesomeIcon icon={faBasketShopping} />}
      >
        Agregar al Carrito
      </Button>
    </VStack>
  );
};

export default ItemCount;
