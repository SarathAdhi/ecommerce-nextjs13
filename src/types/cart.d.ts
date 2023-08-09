import { DocumentData, DocumentReference } from "firebase/firestore";
import { Product } from "./product";

type MyCart<T = DocumentReference<DocumentData>> = {
  qty: number;
  id: T;
};

type Cart<T = DocumentReference<DocumentData>> = {
  userId: string;
  myCart: MyCart<T>[];
};
