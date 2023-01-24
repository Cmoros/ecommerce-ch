import { getResults, signIn, userFromResult } from "db/firebase";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUser, updateLikesInDB } from "services/ClientService";
import { Client, ClientFull, defaultFullUser } from "typescript/types/Client";
import IItem from "typescript/types/Item";

const authContext = createContext({
  isAuthenticated: false,
  isAuthtenticating: false,
  login: async () => console.log("Default login"),
  logout: (): void => console.log("Default logout"),
  getUserInfo: (): null | Client => null,
  addLike: (id: IItem["id"]) => console.log("Default addLike", { id }),
  removeLike: (id: IItem["id"]) => console.log("Default removeLike", { id }),
  getLikeList: (): IItem["id"][] => [],
});

interface IProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  // const { setPropCache, getCache } = useCacheContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthtenticating, setIsAuthtenticating] = useState(true);
  const [user, setUser] = useState<ClientFull>(defaultFullUser);
  const [likeList, setLikeList] = useState<IItem["id"][]>([]);
  const login = useCallback(async () => {
    await signIn();
    // getResults();
    // setIsAuthenticated(true);
    // // setUser(loggedUser);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(defaultFullUser);
    setLikeList([]);
    localStorage.removeItem("googleResult");
  }, []);

  const loginFromCache = useCallback(async () => {
    const oldResStr = localStorage.getItem("googleResult");
    if (!oldResStr) throw new Error("No user found on cache");
    const oldRes = JSON.parse(oldResStr);
    const [user] = userFromResult(oldRes);
    const userFromDB = await getUser(
      user as Client & Required<Pick<Client, "token">>
    );
    setUser(userFromDB);
    setLikeList(userFromDB.likes);
    setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    setIsAuthtenticating(true);
    (async () => {
      try {
        const [user, credential] = await getResults();
        if (!("token" in user)) throw new Error("token not found");
        const userFromDB = await getUser(
          user as Client & Required<Pick<Client, "token">>
        );
        setUser(userFromDB);
        setLikeList(userFromDB.likes);
        setIsAuthenticated(true);
        localStorage.setItem("googleResult", JSON.stringify(credential));
      } catch (e) {
        console.error(
          "Custom Error: Error in getting results from redirect",
          e
        );
        loginFromCache();
      } finally {
        setIsAuthtenticating(false);
      }
    })();
    return () => setIsAuthtenticating(false);
  }, [loginFromCache]);

  const getUserInfo = () => {
    if (!isAuthenticated) return null;
    return user;
  };

  const addLike = useCallback(
    (id: IItem["id"]) => {
      if (!isAuthenticated) return;
      setLikeList((old) => {
        if (old.includes(id)) return old;
        const newList = [...old, id];
        updateLikesInDB(user.id, newList);
        return newList;
      });
    },
    [user, isAuthenticated]
  );

  const removeLike = useCallback(
    (id: IItem["id"]) => {
      if (!isAuthenticated) return;
      setLikeList((old) => {
        if (!old.includes(id)) return old;
        const newList = old.filter((item) => item !== id);
        updateLikesInDB(user.id, newList);
        return newList;
      });
    },
    [isAuthenticated, user]
  );

  const getLikeList = () => likeList;

  return (
    <authContext.Provider
      value={{
        login,
        logout,
        getUserInfo,
        isAuthenticated,
        isAuthtenticating,
        addLike,
        removeLike,
        getLikeList,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;

export const useAuthContext = () => useContext(authContext);
