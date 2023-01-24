import { Center, IconButton } from "@chakra-ui/react";
import { faHeart as faHeartSolid } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IProps {
  active: boolean;
  onLike: (liked: boolean) => void;
}

const FavoriteButton = ({ active, onLike }: IProps) => {
  return (
    <Center
      color="red"
      position="absolute"
      top="2.5"
      right="2.5"
      w="5"
      h="5"
      zIndex="dropdown"
    >
      <IconButton
        position="absolute"
        icon={<FontAwesomeIcon icon={faHeartSolid} />}
        aria-label="like"
        // _hover={{ display: "block" }}
        onClick={() => onLike(false)}
      />
      <IconButton
        position="absolute"
        icon={<FontAwesomeIcon icon={faHeartRegular} />}
        aria-label="remove like"
        display={active ? `none` : `block`}
        // _hover={{ display: "none" }}
        onClick={() => onLike(true)}
      />
    </Center>
  );
};

export default FavoriteButton;
