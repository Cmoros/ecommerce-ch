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
import { IItemCard, IPropsCard } from "./Item";

const ItemCount = ({
  stock,
  initial,
  onAdd,
}: Pick<IItemCard, "initial" | "stock"> & Pick<IPropsCard, "onAdd">) => {
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
          disabled={quantity === 1}
        />
        <Text>{quantity}</Text>
        <IconButton
          icon={<AddIcon />}
          colorScheme="red"
          aria-label={"add 1"}
          onClick={() => handleAdd(1)}
          disabled={quantity === stock}
        />
      </ButtonGroup>
      <Button
        colorScheme="red"
        textAlign="center"
        maxW={175}
        onClick={() => onAdd(quantity)}
        rightIcon={<FontAwesomeIcon icon={faBasketShopping} />}
      >
        Add to Cart
      </Button>
    </VStack>
  );
};

export default ItemCount;
