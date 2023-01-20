import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const CartWidget = () => {
  return (
    <Link to={"/cart"}>
      <IconButton
        aria-label="View cart"
        size="md"
        color="red.500"
        border="1px"
        _hover={{ bg: "red.500", color: "white" }}
        _active={{ bg: "red.700", color: "white" }}
        icon={<FontAwesomeIcon icon={faCartShopping} />}
      />
    </Link>
  );
};

export default CartWidget;
