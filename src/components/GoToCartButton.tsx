import { Text, VStack, Button } from "@chakra-ui/react";
import { faBasketShopping, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import Price from "./Price";

interface IProps {
  quantity: number;
  total: number;
  onCancel: () => void;
}

const GoToCartButton = ({ quantity, total, onCancel }: IProps) => {
  return (
    <VStack w="full" justifyContent="center" spacing={3}>
      <Text>You have {quantity} of this product in Cart</Text>
      <Text>
        Total: <Price>{total}</Price>
      </Text>
      <Button
        to={"/cart"}
        as={Link}
        colorScheme="red"
        textAlign="center"
        maxW={175}
        rightIcon={<FontAwesomeIcon icon={faBasketShopping} />}
      >
        Go to Cart
      </Button>
      <Button
        colorScheme="yellow"
        textAlign="center"
        maxW={175}
        onClick={onCancel}
        rightIcon={<FontAwesomeIcon icon={faX} />}
      >
        Keep Buying
      </Button>
    </VStack>
  );
};

export default GoToCartButton;
