import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  getFirestore,
  addDoc,
} from "firebase/firestore";
import { checkIsItem } from "typescript/typeguards/Item";
import { initializeApp } from "firebase/app";
import IItem from "typescript/types/Item";

const firebaseConfig = {
  apiKey: "AIzaSyDor2MMpPmT10uY6ACiAe9w8jXUgjKIM-Q",
  authDomain: "ecommerce-ch-be623.firebaseapp.com",
  projectId: "ecommerce-ch-be623",
  storageBucket: "ecommerce-ch-be623.appspot.com",
  messagingSenderId: "631748942135",
  appId: "1:631748942135:web:b65e2832a018bd7cba22b2",
  measurementId: "G-WQV37EQD8S",
};

const app = initializeApp(firebaseConfig, "test");
const db = getFirestore(app);

const itemsCollection = collection(db, "items");

export const getAllItems = async (): Promise<IItem[]> => {
  const snapshot = await getDocs(itemsCollection);
  const items: IItem[] = [];
  for (const doc of snapshot.docs) {
    const item = doc.data();
    item.id = doc.id;
    if (checkIsItem(item)) items.push(item);
  }
  console.log(items);
  return items;
};

export const getItemById = async (id: string): Promise<IItem | null> => {
  const itemRef = doc(db, "items", id);
  const snapshot = await getDoc(itemRef);
  const item = snapshot.data();
  if (!item) return null;
  item.id = snapshot.id;
  console.log({ item });
  if (checkIsItem(item)) return item;
  return null;
};

export const getItemsByCategory = async (
  category: string
): Promise<IItem[]> => {
  if (!category) return await getAllItems();
  const q = query(itemsCollection, where("category", "==", category));
  const snapshot = await getDocs(q);
  const items: IItem[] = [];
  for (const doc of snapshot.docs) {
    const item = doc.data();
    item.id = doc.id;
    if (checkIsItem(item)) items.push(item);
  }
  console.log(items);
  return items;
};

export const addNewItem = async (item: IItem): Promise<string> => {
  const itemRef = await addDoc(itemsCollection, item);
  console.log("Document written with ID:", itemRef.id);
  return itemRef.id;
};
