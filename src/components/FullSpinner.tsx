import { Flex, Spinner } from "@chakra-ui/react";

const FullSpinner = () => {
  return (
    <Flex w="full" h="full" alignItems="center" justifyContent="center">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="red.500"
        size="xl"
      />
    </Flex>
  );
};

export default FullSpinner;
