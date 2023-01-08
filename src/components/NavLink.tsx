import { Link } from "@chakra-ui/react";
import { ReactNode } from "react";

const NavLink = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link
    px={1.5}
    py={2}
    rounded={"md"}
    _hover={{
      bg: "red.400",
    }}
    href={href}
  >
    {children}
  </Link>
);

export default NavLink;
