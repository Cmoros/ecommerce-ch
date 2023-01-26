import { Box, Container, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import FullSpinner from "components/FullSpinner";
import Item from "components/Item";
import ItemList from "components/ItemList";
import { useAuthContext } from "context/authContext";
import { useCartContext } from "context/cartContext";
import WishListLogin from "layout/WishListLogin";
import { useCallback, useEffect, useState } from "react";
import { getManyItemsById } from "services/itemService";
import IItem, { IItemCard } from "typescript/types/Item";

const WishList = () => {
  const { addItem } = useCartContext();
  const {
    getUserInfo,
    getLikeList,
    isAuthenticated,
    login,
    isAuthtenticating,
    addLike,
    removeLike,
  } = useAuthContext();
  const [itemMap, setItemMap] = useState<Record<IItemCard["id"], IItemCard>>(
    {}
  );
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

  const onLike = useCallback(
    (id: IItem["id"], liked: boolean): void => {
      if (liked) {
        addLike(id);
      } else {
        removeLike(id);
      }
    },
    [addLike, removeLike]
  );

  useEffect(() => {
    (async () => {
      if (isAuthenticated) {
        const items = await getManyItemsById(getLikeList());
        const newItemMap = items.reduce<typeof itemMap>((acc, item) => {
          acc[item.id] = { ...item, quantity: 1 };
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
      <SimpleGrid
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {Object.values(itemMap).map((item) => (
          <Item
            item={item}
            addItem={addItem}
            onLike={onLike}
            key={item.id}
            liked={true}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default WishList;
