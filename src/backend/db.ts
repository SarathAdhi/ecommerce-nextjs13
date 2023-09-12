import { initializeApp } from "firebase/app";
import { collection, getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_FIREBASE_API_KEY,
  authDomain: "ecommerce-12aff.firebaseapp.com",
  projectId: "ecommerce-12aff",
  storageBucket: "ecommerce-12aff.appspot.com",
  messagingSenderId: "61913605679",
  appId: process.env.NEXT_FIREBASE_APP_ID,
  measurementId: "G-F937ZBSYJW",
};

const app = initializeApp(firebaseConfig);

export const dbFireStore = getFirestore(app);
export const storage = getStorage(app);

export const userCollectionRef = collection(dbFireStore, "users");
export const productCollectionRef = collection(dbFireStore, "products");
export const sellerCollectionRef = collection(dbFireStore, "sellers");
export const cartCollectionRef = collection(dbFireStore, "cart");
export const reviewCollectionRef = collection(dbFireStore, "reviews");
export const orderCollectionRef = collection(dbFireStore, "orders");

// export const auth = getAuth(app);
