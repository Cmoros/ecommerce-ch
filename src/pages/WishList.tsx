import { Box, Container, Heading, Text } from "@chakra-ui/react";
import FullSpinner from "components/FullSpinner";
import ItemList from "components/ItemList";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import WishListLogin from "layout/WishListLogin";
import { useCallback, useEffect, useState } from "react";
import { getManyItemsById } from "services/itemService";
import IItem from "typescript/types/Item";

const WishList = () => {
  const { addItem } = useCartContext();
  const {
    getUserInfo,
    getLikeList,
    isAuthenticated,
    login,
    isAuthtenticating,
  } = useAuthContext();
  const [itemMap, setItemMap] = useState<Record<IItem["id"], IItem>>({});
  useEffect(() => {
    setItemMap((old) => {
      const copy = { ...old };
      const likeList = new Set([...getLikeList()]);
      for (const id in copy) {
        if (!likeList.has(id)) {
          delete copy[id];
        }
      }
      return copy;
    });
  }, [getLikeList]);

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const items = await getManyItemsById(getLikeList());
        const newItemMap = items.reduce<typeof itemMap>((acc, item) => {
          acc[item.id] = item;
          return acc;
        }, {});
        setItemMap(newItemMap);
      } else {
        setItemMap({});
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const onLogin = useCallback(async () => {
    try {
      await login();
    } catch (e) {
      console.error("There was an error in the login in wishlist", e);
    }
  }, [login]);
  if (isAuthtenticating)
    return (
      <Box>
        <FullSpinner />
      </Box>
    );
  if (!isAuthenticated) return <WishListLogin onLogin={onLogin} />;
  return (
    <Container maxW="container.xl">
      <Heading py={2}>WishList</Heading>
      <Heading as="h3" py={2} fontSize="2xl">
        Hello {getUserInfo()?.name} !
      </Heading>
      <Text py={3}>
        Here you can see the items you&apos;ve liked, add them to cart or press
        the heart button to dislike them.
      </Text>
      <ItemList items={Object.values(itemMap)} addItem={addItem} />
    </Container>
  );
};

export default WishList;
