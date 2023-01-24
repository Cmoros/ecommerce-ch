import { db, TransactionError } from "db/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  documentId,
  getDoc,
  getDocs,
  query,
  QuerySnapshot,
  runTransaction,
  Transaction,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { checkIsItem } from "typescript/typeguards/Item";
import IItem, { IItemCard } from "typescript/types/Item";

const itemsCollection = collection(db, "items");

const itemDoc = (id: IItem["id"]) => {
  return doc(itemsCollection, id);
};

export const getAllItems = async (): Promise<IItem[]> => {
  const snapshot = await getDocs(itemsCollection);
  const items: IItem[] = [];
  for (const doc of snapshot.docs) {
    const item = doc.data();
    item.id = doc.id;
    if (checkIsItem(item)) items.push(item);
  }
  return items;
};

export const getItemById = async (id: string): Promise<IItem | null> => {
  const itemRef = doc(itemsCollection, id);
  const snapshot = await getDoc(itemRef);
  const item = snapshot.data();
  if (!item) return null;
  item.id = snapshot.id;
  if (checkIsItem(item)) return item;
  return null;
};

const getItemFromSnapshot = (
  snapshot: QuerySnapshot<DocumentData>
): IItem[] => {
  const items: IItem[] = [];
  for (const doc of snapshot.docs) {
    const item = doc.data();
    item.id = doc.id;
    if (checkIsItem(item)) items.push(item);
  }
  return items;
};

export const getItemsByCategory = async (
  category: string
): Promise<IItem[]> => {
  if (!category) return await getAllItems();
  const q = query(itemsCollection, where("category", "==", category));
  const snapshot = await getDocs(q);
  return getItemFromSnapshot(snapshot);
};

export const getManyItemsById = async (
  ids: IItem["id"][]
): Promise<IItem[]> => {
  const q = query(itemsCollection, where(documentId(), "in", ids));
  const snapshot = await getDocs(q);
  return getItemFromSnapshot(snapshot);
};

export const addNewItem = async (item: IItem): Promise<string> => {
  const itemRef = await addDoc(itemsCollection, item);
  console.log("Document written with ID:", itemRef.id);
  return itemRef.id;
};

export const addManyItems = async (items: IItem[]): Promise<string[]> => {
  const batch = writeBatch(db);
  const ids = items.map((item): string => {
    const ref = doc(itemsCollection);
    batch.set(ref, item);
    return ref.id;
  });
  await batch.commit();
  return ids;
};

export const updateItem = async (
  id: string,
  partialItem: Omit<Partial<IItem>, "id">
) => {
  await updateDoc(doc(itemsCollection, id), partialItem);
};

export const substractStockByQuantity = async (
  id: string,
  quantity: number
): Promise<number> => {
  const itemRef = itemDoc(id);
  try {
    const newStock = await runTransaction(db, async (transaction) => {
      const itemDoc = await transaction.get(itemRef);
      if (!itemDoc.exists()) {
        throw new TransactionError(
          `Document with id: ${id} does not exists`,
          "DocNotExists"
        );
      }
      const item = itemDoc.data();
      item.id = itemDoc.id;
      if (!checkIsItem(item)) {
        throw new TransactionError(
          `Document with id ${id} not an expected item: ${JSON.stringify(
            item
          )}`,
          "DocNotTypeExpected"
        );
      }

      const newStock = item.stock - quantity;
      if (newStock < 0) {
        throw new TransactionError(
          `Document with id ${id} with negative stock: ${newStock}`,
          "DocDataError"
        );
      }
      transaction.update(itemRef, { stock: newStock });
      return newStock;
    });
    return newStock;
  } catch (err: unknown) {
    console.error("Error updating stock with quantity:", err);
    throw err;
  }
};

export const substractManyStockByQuantity = async (
  items: Pick<IItemCard, "id" | "quantity">[]
): Promise<IItem[]> => {
  const transactionHandler = getSubstractManyTransactionHandler(items);
  try {
    const updatedItems = await runTransaction(db, transactionHandler);
    return updatedItems;
  } catch (err: unknown) {
    console.error("Error updating many stocks with quantity:", err);
    throw err;
  }
};

export const getSubstractManyTransactionHandler = (
  items: Pick<IItemCard, "id" | "quantity">[]
) => {
  const itemRefs = items.map(({ id }) => itemDoc(id));
  return async (transaction: Transaction) => {
    const updatedItems = await Promise.all(
      itemRefs.map(async (itemRef, i) => {
        const { id, quantity } = items[i];
        const itemDoc = await transaction.get(itemRef);
        if (!itemDoc.exists()) {
          throw new TransactionError(
            `Document with id: ${id} does not exists`,
            "DocNotExists"
          );
        }
        const item = itemDoc.data();
        item.id = itemDoc.id;
        if (!checkIsItem(item)) {
          throw new TransactionError(
            `Document with id ${id} not an expected item: ${JSON.stringify(
              item
            )}`,
            "DocNotTypeExpected"
          );
        }

        const newStock = item.stock - quantity;
        if (newStock < 0) {
          throw new TransactionError(
            `Document with id ${id} with negative stock: ${newStock}`,
            "DocDataError"
          );
        }
        item.stock = newStock;
        return item;
      })
    );
    for (let i = 0; i < updatedItems.length; i++) {
      const newStock = updatedItems[i].stock;
      const itemRef = itemRefs[i];
      transaction.update(itemRef, { stock: newStock });
    }
    return updatedItems;
  };
};
