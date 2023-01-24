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

function MainHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getCategories } = useCategoryContext();
  return (
    <Box
      as="header"
      bg={"red.500"}
      zIndex="dropdown"
      px={4}
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
        <HStack spacing={8} alignItems={"center"} w="full">
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
          <Stack as={"nav"} spacing={4}>
            <Link to={"/home"}>Home</Link>
            {getCategories().map(({ category, label }) => (
              <Link key={label} to={`/category/${category}`}>
                {label}
              </Link>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

export default MainHeader;
