import { Box, HStack } from "@chakra-ui/react";
import NavLink from "./NavLink";
import links from "constants/navBarLinks";
import CartWidget from "./CartWidget";

const NavBar = () => {
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
        {links.map(({ to, label }) => (
          <NavLink key={label} to={to}>
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
