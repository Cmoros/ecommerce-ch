import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { ITransactionError } from "typescript/types/TransactionError";
import {
  getAuth,
  getRedirectResult,
  GoogleAuthProvider,
  OAuthCredential,
  signInWithRedirect,
  UserCredential,
} from "firebase/auth";
import { Client } from "typescript/types/Client";

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
const provider = new GoogleAuthProvider();

const auth = getAuth(app);

export const signIn = () => signInWithRedirect(auth, provider);

export const getResults = async (): Promise<[Client, UserCredential]> => {
  const result = await getRedirectResult(auth);
  return userFromResult(result);
};

export const userFromResult = (
  result: UserCredential | null
): [Client, UserCredential] => {
  if (!result) throw new Error("No redirect found");
  if (!result) throw new Error("Error: No login user");
  // This gives you a Google Access Token. You can use it to access Google APIs.
  const credential = GoogleAuthProvider.credentialFromResult(result);

  if (!credential) throw new Error("Error: No credential found");
  // const token = credential.accessToken;
  // The signed-in user info.
  const { email, displayName, phoneNumber } = result.user;

  return [
    {
      email: email || "defaultEmail",
      name: displayName || "defaultName",
      phone: phoneNumber || "defaultPhone",
    },
    result,
  ];
};

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
