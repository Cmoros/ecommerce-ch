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
      {active ? (
        <IconButton
          position="absolute"
          title="Remove Like"
          data-testid="rm-like"
          icon={<FontAwesomeIcon icon={faHeartSolid} />}
          aria-label="remove like"
          // _hover={{ display: "block" }}
          onClick={() => onLike(false)}
        />
      ) : (
        <IconButton
          position="absolute"
          icon={<FontAwesomeIcon icon={faHeartRegular} />}
          aria-label="like"
          data-testid="add-like"
          title="Add Like"
          // display={active ? `none` : `block`}
          // _hover={{ display: "none" }}
          onClick={() => onLike(true)}
        />
      )}
    </Center>
  );
};

export default FavoriteButton;
