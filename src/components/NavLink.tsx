/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck
import { Link, Text } from "@chakra-ui/react";
import { CSSProperties, ReactNode, useState } from "react";
import { NavLink as RNavLink } from "react-router-dom";
import { ItemCategory } from "typescript/types/Item";

const defaultStyles = {
  _hover: {
    bg: "red.400",
  },
};

const activeStyles = {
  bg: "red.400",
};

const styles = {
  _hover: {
    bg: "red.400",
  },
};

const NavLink = ({ to, children }: { to: string; children: ReactNode }) => {
  // const [styles, setStyles] = useState<
  //   typeof defaultStyles | typeof activeStyles
  // >(defaultStyles);

  return (
    <Text>
      <Link
        px={1.5}
        py={2}
        rounded={"md"}
        as={RNavLink}
        to={to}
        // style={({ isActive }: { isActive: boolean }): CSSProperties => {
        //   if (isActive) {
        //     if ("_hover" in styles) {
        //       setStyles(activeStyles);
        //     }
        //   } else {
        //     if ("bg" in styles) {
        //       setStyles(defaultStyles);
        //     }
        //   }
        //   return {};
        // }}
        border="2px"
        borderColor="transparent"
        {...styles}
      >
        {children}
      </Link>
    </Text>
  );
};

export default NavLink;
