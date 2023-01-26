import {
  Container,
  Center,
  Heading,
  Button,
  Image,
  Text,
} from "@chakra-ui/react";

interface IProps {
  onLogin: () => void;
}

const WishListLogin = ({ onLogin }: IProps) => {
  return (
    <Container maxW="container.xl">
      <Center flexDir="column" gap="calc(4px + 2vw)">
        <Heading>It seems that you&apos;re not in a session</Heading>
        <Text>You can see your wishlist after logging in:</Text>
        <Button title="Log in with Google" onClick={onLogin}>
          <Image
            src="src/public/assets/img/google/btn_google_signin_dark_normal_web.png"
            alt="Google Log in"
          />
        </Button>
      </Center>
    </Container>
  );
};

export default WishListLogin;
