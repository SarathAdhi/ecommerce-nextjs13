import { DocumentData, DocumentReference } from "firebase/firestore";
import { Product } from "./product";

type Cart<T = DocumentReference<DocumentData>> = {
  userId: string;
  myCart: T[];
};
