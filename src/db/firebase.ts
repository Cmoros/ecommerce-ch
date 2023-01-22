import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { ITransactionError } from "typescript/types/TransactionError";

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
export const db = getFirestore(app);

export class TransactionError extends Error implements ITransactionError {
  type: ITransactionError["type"];
  constructor(
    message: ITransactionError["message"],
    type: ITransactionError["type"]
  ) {
    super(message);
    this.type = type;
  }
}
