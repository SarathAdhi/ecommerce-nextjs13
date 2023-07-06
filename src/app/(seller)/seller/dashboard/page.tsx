import { sellerCollectionRef } from "@backend/db";
import { filterDocs } from "@backend/lib";
import ProductCard from "@components/ProductCard";
import { fetchProductsImages } from "@utils/fetch-product";
import { getSellerProfile } from "@utils/get-profile";
import { doc, where } from "firebase/firestore";
import { useSearchParams } from "next/navigation";
import React from "react";
import { Product } from "types/product";

const SellerDashboard = async () => {
  // const view = useSearchParams().get("view");
  const seller = await getSellerProfile("/seller?auth-seller=login");

  // const isStats = view === "stats";

  const _products: Product[] = await filterDocs(
    "products",
    where("owner", "==", doc(sellerCollectionRef, seller?.id))
  );

  const products = await fetchProductsImages(_products);

  return (
    <div className="grid grid-cols-4 gap-4">
      {products.map((e) => (
        <ProductCard key={e.id} {...e} />
      ))}
    </div>
  );
};

export default SellerDashboard;
