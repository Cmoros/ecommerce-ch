import { Text, TextProps } from "@chakra-ui/react";
import { faDollarSign } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IProps = TextProps;

const Price = (props: IProps) => {
  const { children } = props;
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
      {children}
      <Text as="span" fontSize="sm">
        .00
      </Text>
    </Text>
  );
};

export default Price;
