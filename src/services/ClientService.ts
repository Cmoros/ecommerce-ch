import { db } from "db/firebase";
import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { checkIsClientFull } from "typescript/typeguards/Client";
import { Client, ClientFull } from "typescript/types/Client";
import IItem from "typescript/types/Item";

const clientCollection = collection(db, "clients");

// const clientDoc = (id: string) => doc(clientCollection, id);

export const getUser = async (
  user: Client & Required<Pick<Client, "token">>
): Promise<ClientFull> => {
  try {
    const q = query(
      clientCollection,
      where("email", "==", user.email),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    const [userSnapshot] = querySnapshot.docs;
    let res;
    if (userSnapshot) {
      res = userSnapshot.data();
      res.id = userSnapshot.id;
      if (!checkIsClientFull(res))
        throw new Error("DB Error: User not type expected");
      return res;
    }
    const newClientDoc = doc(clientCollection);
    await setDoc(newClientDoc, user);
    return { ...user, id: newClientDoc.id };
  } catch (e) {
    console.error("Error in DB:", e);
    throw e;
  }
};

export const updateLikesInDB = async (
  id: ClientFull["id"],
  newList: IItem["id"][]
) => {
  const clientRef = doc(clientCollection, id);
  await updateDoc(clientRef, { likes: newList });
};
