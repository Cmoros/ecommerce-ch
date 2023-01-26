import {
  Box,
  Flex,
  HStack,
  IconButton,
  Stack,
  Text,
  useDisclosure,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import NavBar from "components/NavBar";
import { useCategoryContext } from "context/categoryContext";
import { useAuthContext } from "context/authContext";
import FullSpinner from "components/FullSpinner";

function MainHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, isAuthtenticating, getUserInfo } = useAuthContext();
  const { getCategories } = useCategoryContext();
  return (
    <Box
      as="header"
      bg={"red.500"}
      zIndex="sticky"
      px={{ base: 1, sm: 2, md: 4 }}
      w="full"
      color="white"
      position="sticky"
      top="0"
    >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        w="full"
      >
        <HStack alignItems={"center"} w="full" gap="2vw">
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            bg="transparent"
            color="white"
          />
          <VStack>
            <Text fontSize="xl">
              <ChakraLink
                as={Link}
                to="/"
                display="flex"
                flexDirection="column"
                gap="0"
              >
                <Text as="span" mb="-2">
                  Frutería
                </Text>
                <Text as="span">Eudalia</Text>
              </ChakraLink>
            </Text>
          </VStack>
          <NavBar />
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"}>
            <Link to={"/home"}>Home</Link>
            {getCategories().map(({ category, label }) => (
              <Link key={label} to={`/category/${category}`}>
                {label}
              </Link>
            ))}
            {isAuthtenticating ? (
              <FullSpinner />
            ) : (
              isAuthenticated && (
                <Box textAlign="right" pr="2" fontSize="xl">
                  <Link to="/wishlist">{getUserInfo()?.name}</Link>
                </Box>
              )
            )}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default MainHeader;
