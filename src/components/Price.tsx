import { Text, TextProps } from "@chakra-ui/react";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IProps = TextProps;

const Price = (props: IProps) => {
  const { children } = props;
  const [int, dec] = children!.toString().split(".");
  return (
    <Text
      as="span"
      {...props}
      fontWeight="bold"
      letterSpacing={-1}
      fontSize="2xl"
      color="green"
    >
      <FontAwesomeIcon icon={faDollarSign} />
      {int}
      <Text as="span" fontSize="sm">
        {dec || ".00"}
      </Text>
    </Text>
  );
};

export default Price;
