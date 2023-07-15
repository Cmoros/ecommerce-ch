import { AddIcon, MinusIcon } from "@chakra-ui/icons";
import { ButtonGroup, IconButton, Text, VStack } from "@chakra-ui/react";
import { IItemCard } from "../typescript/types/Item";

interface IProps {
  stock: IItemCard["stock"];
  quantity: IItemCard["quantity"];
  onChange: (updated: number) => void;
}

const CartItemCount = ({ stock, quantity, onChange }: IProps) => {
  const handleAdd = () => {
    // if (quantity >= stock) return;   // Coverage
    onChange(1);
  };

  const handleSubstract = () => {
    // if (quantity <= 1) return;       // Coverage
    onChange(-1);
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
          data-testid={"minus-1"}
          size="sm"
          onClick={handleSubstract}
          disabled={quantity <= 1}
        />
        <Text data-testid="quantity">{quantity}</Text>
        <IconButton
          icon={<AddIcon />}
          colorScheme="red"
          size="sm"
          aria-label={"add 1"}
          data-testid={"add-1"}
          onClick={handleAdd}
          disabled={quantity >= stock}
        />
      </ButtonGroup>
    </VStack>
  );
};

export default CartItemCount;
