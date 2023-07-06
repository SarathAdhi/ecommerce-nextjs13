import { DocumentData, DocumentReference } from "firebase/firestore";
import { Seller } from "./user";

interface Product<T = DocumentReference<DocumentData>> {
  id: string;
  uuid: string;
  pname: string;
  price: number;
  description: string;
  images: { name: string; url: string }[];
  imagePath: string;
  quantity: number;
  discount: number;
  reviews: [];
  owner: T;
}
