import { db, TransactionError } from "db/firebase";
import { collection, doc, runTransaction } from "firebase/firestore";
import { Purchase } from "typescript/types/Purchase";
import { getSubstractManyTransactionHandler } from "./itemService";

const purchasesCollection = collection(db, "purchases");
const createNewPurchaseDoc = () => doc(purchasesCollection);

export type PrePurchase = Pick<Purchase, "buyer"> & {
  items: Pick<Purchase["items"][number], "id" | "quantity" | "price">[];
};

export const addNewPurchase = async (
  prePurchase: PrePurchase
): Promise<Purchase> => {
  const { items } = prePurchase;
  try {
    const newPurchase = runTransaction(db, async (transaction) => {
      const updatedItems = await getSubstractManyTransactionHandler(items)(
        transaction
      );
      const itemsPurchased: Purchase["items"] = [];
      let total = 0;
      for (let i = 0; i < items.length; i++) {
        const { id, title, price: priceServer } = updatedItems[i];
        const { quantity, price: priceClient } = items[i];
        if (priceServer !== priceClient) {
          throw new TransactionError(
            `Error: client price and server price doesnt match on product id: ${id}`,
            "DocsDismatch"
          );
        }
        const subtotal = quantity * priceServer;
        total += subtotal;
        itemsPurchased.push({
          id,
          title,
          price: priceServer,
          quantity,
          subtotal,
        });
      }
      const purchase: Omit<Purchase, "id"> = {
        buyer: prePurchase.buyer,
        items: itemsPurchased,
        date: new Date(),
        total,
      };
      const purchaseRef = createNewPurchaseDoc();
      transaction.set(purchaseRef, purchase);
      const newPurchase = { ...purchase, id: purchaseRef.id };
      return newPurchase;
    });
    return newPurchase;
  } catch (err: unknown) {
    console.error("Error adding new purchase:", err);
    throw err;
  }
};
