import { Box, HStack } from "@chakra-ui/react";
import NavLink from "./NavLink";
import CartWidget from "./CartWidget";
import { useCategoryContext } from "context/categoryContext";

const NavBar = () => {
  const { getCategories } = useCategoryContext();

  return (
    <HStack
      as="nav"
      spacing={4}
      w="full"
      justifyContent={{
        base: "flex-end",
        md: "space-between",
      }}
    >
      <HStack spacing={4} display={{ base: "none", md: "flex" }}>
        <NavLink to="/home">Home</NavLink>
        {getCategories().map(({ category, label }) => (
          <NavLink key={label} to={`category/${category}`}>
            {label}
          </NavLink>
        ))}
        <NavLink to="/test">Test</NavLink>
      </HStack>
      <Box>
        <CartWidget />
      </Box>
    </HStack>
  );
};

export default NavBar;
