import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import {
  Button,
  ButtonGroup,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { faBasketShopping, faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useRef, useState } from "react";
import { IItemCard } from "../typescript/types/Item";

interface IProps {
  stock: IItemCard["stock"];
  initial: IItemCard["quantity"];
  onAdd: (quantity: number) => void;
}

const defaultStyles = {
  colorScheme: "red",
  rightIcon: <FontAwesomeIcon icon={faBasketShopping} />,
};

const addedStyles = {
  colorScheme: "green",
  rightIcon: <FontAwesomeIcon icon={faCheck} />,
};

const ItemCount = ({ stock, initial, onAdd }: IProps) => {
  const [quantity, setQuantity] = useState(initial > 0 ? initial : 1);
  const [wasAdded, setAdded] = useState(false);
  const styles = wasAdded ? addedStyles : defaultStyles;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const timeout = useRef<NodeJS.Timeout>(
    setTimeout(() => {
      ("");
    })
  );

  const handleAdded = useCallback(() => {
    setAdded(true);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setAdded(false);
    }, 2000);
  }, []);

  const handleAdd = (toAdd: number) => {
    // if (quantity >= stock) return;
    if (quantity + toAdd >= stock) {
      setQuantity(stock);
      return;
    }
    setQuantity((old) => old + toAdd);
  };

  const handleSubstract = (toSubstract: number) => {
    // if (quantity === 1) return;
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
          data-testid="minus-1"
          title="Remove 1"
          onClick={() => handleSubstract(1)}
          disabled={quantity <= 1 || stock <= 0}
        />
        <Text data-testid="quantity">{stock <= 0 ? "N/S" : quantity}</Text>
        <IconButton
          icon={<AddIcon />}
          colorScheme="red"
          aria-label={"add 1"}
          title="Add 1"
          data-testid="add-1"
          onClick={() => handleAdd(1)}
          disabled={quantity >= stock}
        />
      </ButtonGroup>

      <Button
        {...styles}
        textAlign="center"
        data-testid="add-to-cart"
        title="Add to Cart"
        disabled={stock <= 0 || quantity > stock}
        maxW={175}
        onClick={() => {
          // if (quantity <= 0) return;
          handleAdded();
          onAdd(quantity);
        }}
      >
        {wasAdded ? "Added to Cart" : "Add to Cart"}
      </Button>
    </VStack>
  );
};

export default ItemCount;
