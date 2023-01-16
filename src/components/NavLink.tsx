import { Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { NavLink as RNavLink } from "react-router-dom";

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => {
  return (
    <Text
      px={1.5}
      py={2}
      rounded={"md"}
      _hover={{
        bg: "red.400",
      }}
    >
      <RNavLink to={to}>{children}</RNavLink>
    </Text>
  );
};

export default NavLink;
