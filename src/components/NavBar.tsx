import { Box, Button, HStack, Image, Text } from "@chakra-ui/react";
import NavLink from "./NavLink";
import CartWidget from "./CartWidget";
import { useCategoryContext } from "context/categoryContext";
import { useAuthContext } from "context/authContext";

const NavBar = () => {
  const { getCategories } = useCategoryContext();
  const { login, isAuthenticated, getUserInfo, logout } = useAuthContext();

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
        {!isAuthenticated ? (
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
            <Image src="/src/public/assets/img/google/btn_google_signin_dark_normal_web.png" />
          </Button>
        ) : (
          <HStack gap="1vw">
            <Text
              fontSize="xl"
              fontWeight="bold"
              textAlign="right"
              lineHeight="1.25rem"
              display={{ base: "none", sm: "block" }}
            >
              {getUserInfo()?.name}
            </Text>
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
