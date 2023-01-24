import { Box, Text, Image } from "@chakra-ui/react";
import { ReactNode } from "react";

interface IProps {
  children?: ReactNode;
}

const NotFoundPage = ({ children }: IProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      h="full"
      bg="gray.50"
    >
      <Box maxW="sm" w="full" p={8} textAlign="center">
        <Image
          src="https://via.placeholder.com/150"
          alt="404"
          mx="auto"
          my={8}
        />
        <Text fontSize="4xl" fontWeight="bold" color="gray.800">
          404 - Page Not Found
        </Text>
        <Text color="gray.600">{children}</Text>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
