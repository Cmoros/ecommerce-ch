import { getResults, signIn, userFromResult } from "db/firebase";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Client, defaultUser } from "typescript/types/Client";
import { useCacheContext } from "./cacheContext";

const authContext = createContext({
  isAuthenticated: false,
  isAuthtenticating: false,
  login: async () => console.log("Default login"),
  logout: (): void => console.log("Default logout"),
  getUserInfo: (): null | Client => null,
});

interface IProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: IProps) => {
  // const { setPropCache, getCache } = useCacheContext();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAuthtenticating, setIsAuthtenticating] = useState(true);
  const [user, setUser] = useState<Client>(defaultUser);
  const login = useCallback(async () => {
    await signIn();
    getResults();
    setIsAuthenticated(true);
    // setUser(loggedUser);
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUser(defaultUser);
    localStorage.removeItem("googleResult");
  }, []);

  const loginFromCache = () => {
    const oldResStr = localStorage.getItem("googleResult");
    if (!oldResStr) throw new Error("No user found on cache");
    const oldRes = JSON.parse(oldResStr);
    const [user] = userFromResult(oldRes);
    setUser(user);
    setIsAuthenticated(true);
  };

  useEffect(() => {
    setIsAuthtenticating(true);
    getResults()
      .then(([user, credential]) => {
        setIsAuthenticated(true);
        setUser(user);
        localStorage.setItem("googleResult", JSON.stringify(credential));
      })
      .catch((e) => {
        console.error(
          "Custom Error: Error in getting results from redirect",
          e
        );
        loginFromCache();
      })
      .catch((e) => {
        console.error("Custom Error: Error in login from cache:", e);
      })
      .finally(() => setIsAuthtenticating(false));
    return () => setIsAuthtenticating(false);
  }, []);

  const getUserInfo = () => {
    if (!isAuthenticated) return null;
    return user;
  };
  return (
    <authContext.Provider
      value={{ login, logout, getUserInfo, isAuthenticated, isAuthtenticating }}
    >
      {children}
    </authContext.Provider>
  );
};

export default authContext;

export const useAuthContext = () => useContext(authContext);
