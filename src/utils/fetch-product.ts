import { storage } from "@backend/db";
import { getFilesInFolder } from "@backend/lib";
import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
import { ref } from "firebase/storage";
import { Product } from "types/product";

export const fetchProductImages = async (_product: Product) => {
  let product = _product;

  const images = await getFilesInFolder(product.imagePath);

  product.images = images.map((url) => ({
    url,
    name: ref(storage, url).fullPath,
  }));

  return product;
};

export const fetchProductDetails = async (_product: Product) => {
  let product = _product;

  const images = await getFilesInFolder(product?.imagePath);

  product.images = images.map((url) => ({
    url,
    name: ref(storage, url).fullPath,
  }));

  const docSnap = await getDoc(
    product.owner as DocumentReference<DocumentData>
  );

  const owner = {
    ...docSnap.data(),
    id: docSnap.id,
  } as Seller;

  return {
    ...product,
    owner: owner,
  };
};

export const fetchProductsImages = async (_products: Product[]) => {
  let products = _products;

  for (let i = 0; i < products.length; i++) {
    let product = products[i];

    const images = await getFilesInFolder(product.imagePath);

    product.images = images.map((url) => ({
      url,
      name: ref(storage, url).fullPath,
    }));
  }

  return products;
};
