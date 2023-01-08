import { HStack } from "@chakra-ui/react";
import NavLink from "./NavLink";
import links from "constants/navBarLinks";

const NavBar = () => {
  return (
    <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
      {links.map(({ href, label }) => (
        <NavLink key={label} href={href}>
          {label}
        </NavLink>
      ))}
    </HStack>
  );
};

export default NavBar;
