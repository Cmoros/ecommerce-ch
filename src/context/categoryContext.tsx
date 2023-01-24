import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllCategories } from "services/categoryService";
import { Category } from "typescript/types/Category";
import { ItemCategory } from "typescript/types/Item";

const categoryContext = createContext({
  getCategories: (): Category[] => [],
  getLabelByCategory: (category: ItemCategory): string => category,
});

interface IProps {
  children: ReactNode;
  initialState?: Category[];
}

export const CategoryContextProvider = ({ children, initialState }: IProps) => {
  const [categoryList, setCategories] = useState<Category[]>(
    initialState ?? []
  );

  const getCategories = () => {
    return categoryList;
  };

  const getLabelByCategory = (category: ItemCategory): string => {
    return (
      categoryList.find((categoryItem) => categoryItem.category === category)
        ?.label || ""
    );
  };

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch((e) => console.error("Error getting categories:", e));
  }, []);

  return (
    <categoryContext.Provider
      value={{
        getCategories,
        getLabelByCategory,
      }}
    >
      {children}
    </categoryContext.Provider>
  );
};

export default categoryContext;

export const useCategoryContext = () => useContext(categoryContext);
