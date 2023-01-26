import { Button, HStack, Image, Link as ChakraLink } from "@chakra-ui/react";
import NavLink from "./NavLink";
import CartWidget from "./CartWidget";
import { useCategoryContext } from "context/categoryContext";
import { useAuthContext } from "context/authContext";
import { Link } from "react-router-dom";
import FullSpinner from "./FullSpinner";

const NavBar = () => {
  const { getCategories } = useCategoryContext();
  const { login, isAuthenticated, getUserInfo, logout, isAuthtenticating } =
    useAuthContext();

  return (
    <HStack
      as="nav"
      // spacing={4}
      w="full"
      justifyContent={{
        base: "flex-end",
        md: "space-between",
      }}
      m={0}
    >
      <HStack display={{ base: "none", md: "flex" }}>
        <NavLink to="/home">Home</NavLink>
        {getCategories().map(({ category, label }) => (
          <NavLink key={label} to={`category/${category}`}>
            {label}
          </NavLink>
        ))}
        <NavLink to="/test">Test</NavLink>
      </HStack>
      <HStack wrap="nowrap" gap="2vw">
        {isAuthtenticating ? (
          <FullSpinner />
        ) : !isAuthenticated ? (
          <Button
            bg="transparent"
            p={0}
            onClick={async () => {
              try {
                await login();
              } catch (e: unknown) {
                console.error("Error in login:", e);
              }
            }}
          >
            <Image src="https://live.staticflickr.com/65535/52647982940_9f56b494db_m.jpg" />
          </Button>
        ) : (
          <HStack gap="1vw">
            <ChakraLink
              as={Link}
              to="/wishlist"
              fontSize="xl"
              fontWeight="bold"
              textAlign="right"
              lineHeight="1.25rem"
              display={{ base: "none", sm: "block" }}
            >
              {getUserInfo()?.name}
            </ChakraLink>
            <Button onClick={logout} color="red" bg="white">
              Sign out
            </Button>
          </HStack>
        )}
        <CartWidget />
      </HStack>
    </HStack>
  );
};

export default NavBar;
