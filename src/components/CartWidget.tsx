import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Box,
  Center,
  IconButton,
  Link as ChakraLink,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useCartContext } from "context/cartContext";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

const CartWidget = () => {
  const { getTotalQuantity } = useCartContext();
  const totalQuantity = getTotalQuantity();
  return (
    <ChakraLink as={Link} to={"/cart"} position="relative">
      {totalQuantity > 0 && (
        <Box
          w="5"
          h="5"
          position="absolute"
          top="-3.5"
          right="-2.5"
          borderRadius="50%"
          bg="white"
          zIndex="popover"
          borderWidth="thin"
        >
          <Center>
            <Text
              color="gray"
              fontSize="xs"
              fontWeight="bold"
              letterSpacing={-1.5}
            >
              {totalQuantity}
            </Text>
          </Center>
        </Box>
      )}
      <IconButton
        aria-label="View cart"
        size="md"
        color="red.500"
        border="1px"
        _hover={{ bg: "red.500", color: "white" }}
        _active={{ bg: "red.700", color: "white" }}
        icon={<FontAwesomeIcon icon={faCartShopping} />}
      />
    </ChakraLink>
  );
};

export default CartWidget;
