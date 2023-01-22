import { CheckIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Heading,
  Text,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

interface IProps {
  id: string;
  isOpen: boolean;
  onClose: () => void;
}

const CheckoutModal = ({ id, isOpen, onClose }: IProps) => {
  const goTo = useNavigate();
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <CheckIcon w="calc(50px + 5vw)" h="calc(50px + 5vw)" color="green" />
          <Heading>Succesful Purchase</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Your purchase has been done succesfully</Text>
          <Text>The id of your purchase is:</Text>
          <Center>
            <Text fontWeight="bold" my={4}>
              {id}
            </Text>
          </Center>
          <Text textAlign="right">Closing this will redirect you to home</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onClose();
              goTo("/");
            }}
          >
            Close
          </Button>
          {/* <Button variant="ghost">Secondary Action</Button> */}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckoutModal;
