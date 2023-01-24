import { db } from "db/firebase";
import { collection, getDocs } from "firebase/firestore";
import { checkIsChategory } from "typescript/typeguards/Category";
import { Category } from "typescript/types/Category";

const categoryCollection = collection(db, "categories");

// const categoryDoc = (id: string) => doc(categoryCollection, id);

export const getAllCategories = async (): Promise<Category[]> => {
  const snapshot = await getDocs(categoryCollection);
  const categories: Category[] = [];
  for (const doc of snapshot.docs) {
    const category = doc.data();
    category.id = doc.id;
    if (checkIsChategory(category)) categories.push(category);
  }
  return categories;
};
