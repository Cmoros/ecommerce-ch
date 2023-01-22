import { CheckIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
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
} from "@chakra-ui/react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.createElement("div");

const CheckoutModalPortal = ({ id }: { id: string }) => {
  const elRef = useRef(document.createElement("div"));

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    onOpen();
    modalRoot.append(elRef.current);
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      modalRoot.removeChild(elRef.current);
    };
  }, [onOpen]);

  return createPortal(
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <CheckIcon w="calc(50px + 5vw)" h="calc(50px + 5vw)" />
          <Heading>Succesful Purchase</Heading>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Your purchase has been done succesfully</Text>
          <Text>The id of your purchase is: {id}</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost">Secondary Action</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>,
    elRef.current
  );
};

export default CheckoutModalPortal;
