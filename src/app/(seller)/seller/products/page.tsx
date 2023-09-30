import { sellerCollectionRef } from "@backend/db";
import { filterDocs } from "@backend/lib";
import ProductCard from "@components/ProductCard";
import { fetchProductsImages } from "@utils/fetch-product";
import { getSellerProfile } from "@utils/get-profile";
import { doc, where } from "firebase/firestore";
import React from "react";
import { Product } from "types/product";

const SellerProductsPage = async () => {
  const seller = await getSellerProfile("/seller/auth/login");

  const _products: Product[] = await filterDocs(
    "products",
    where("owner", "==", doc(sellerCollectionRef, seller?.id))
  );

  const products = await fetchProductsImages(_products);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.length === 0 && <p>No Products...</p>}

      {products.map((e) => (
        <ProductCard key={e.id} {...e} />
      ))}
    </div>
  );
};

export default SellerProductsPage;
