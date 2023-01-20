import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, Text, VStack } from "@chakra-ui/react";
import { IItemCard } from "./Item";

interface IProps {
  stock: IItemCard["stock"];
  quantity: IItemCard["quantity"];
  onChange: (updated: number) => void;
}

const CartItemCount = ({ stock, quantity, onChange }: IProps) => {
  const handleAdd = (toAdd: number) => {
    if (quantity === stock) return;
    if (quantity + toAdd >= stock) {
      onChange(stock);
      return;
    }
    onChange(quantity + 1);
  };

  const handleSubstract = (toSubstract: number) => {
    if (quantity === 1) return;
    if (quantity - toSubstract <= 1) {
      onChange(1);
      return;
    }
    onChange(quantity - toSubstract);
  };

  return (
    <VStack w="full" h="full" justifyContent="center" spacing={3}>
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
          size="sm"
          onClick={() => handleSubstract(1)}
          disabled={quantity === 1}
        />
        <Text>{quantity}</Text>
        <IconButton
          icon={<AddIcon />}
          colorScheme="red"
          size="sm"
          aria-label={"add 1"}
          onClick={() => handleAdd(1)}
          disabled={quantity === stock}
        />
      </ButtonGroup>
    </VStack>
  );
};

export default CartItemCount;
