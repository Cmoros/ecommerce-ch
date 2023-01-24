import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Center,
  Text,
  Image,
} from "@chakra-ui/react";
import { useAuthContext } from "context/authContext";
import { FormEvent, useCallback } from "react";
import { checkIsClient } from "typescript/typeguards/Client";
import { Client } from "typescript/types/Client";
import { getDataFromForm } from "utils";

interface IProps {
  onSubmit: (user: Client) => void;
}

const CheckoutForm = ({ onSubmit }: IProps) => {
  const { login } = useAuthContext();
  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      const { target } = e;
      if (!(target instanceof HTMLFormElement)) return;
      const formData = getDataFromForm(target);
      if (!checkIsClient(formData)) {
        console.error("Form data is not type client");
        return;
      }
      target.reset();
      onSubmit(formData);
    },
    [onSubmit]
  );

  return (
    <>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <VStack spacing={2}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input placeholder="name" name="name" isRequired />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              placeholder="email"
              name="email"
              // type="email"
              isRequired
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input placeholder="+54 1234 5678" name="phone" isRequired />
          </FormControl>
          <Center>
            <Button type="submit">Submit</Button>
          </Center>
        </VStack>
      </form>
      <Center flexDir="column" mt={6} gap={2}>
        <Text>Or you can also sign in with Google:</Text>
        <Button
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
      </Center>
    </>
  );
};

export default CheckoutForm;
