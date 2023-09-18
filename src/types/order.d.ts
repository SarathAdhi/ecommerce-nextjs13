import { Timestamp } from "firebase/firestore";

type Order<T = DocumentReference<DocumentData>> = {
  id: T;
  owners: DocumentReference<DocumentData>[];
  products: {
    id: DocumentReference<DocumentData>;
    owner: DocumentReference<DocumentData>;
    qty: number;
  }[];
  user: DocumentReference<DocumentData>;
  purchasedAt: Timestamp;
  session_id: string;
};
