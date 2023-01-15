import {
  Box,
  Flex,
  HStack,
  IconButton,
  Link,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import links from "constants/navBarLinks";
import NavBar from "components/NavBar";

function MainHeader() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box bg={"red.500"} px={4} w="full" color="white">
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
            <Link fontSize="xl" display="flex" flexDirection="column" gap="0">
              <Text as="span" mb="-2">
                Frutería
              </Text>
              <Text as="span">Eudalia</Text>
            </Link>
          </VStack>
          <NavBar />
        </HStack>
      </Flex>
      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {links.map(({ href, label }) => (
              <Link key={label} href={href}>
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
