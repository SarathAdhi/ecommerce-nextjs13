import { filterDocs } from "@backend/lib";
import { fetchProductDetails } from "@utils/fetch-product";
import { where } from "firebase/firestore";
import React from "react";
import { Product } from "types/product";
import EditProductForm from "@modules/seller/product/EditProductForm";
import { getSellerProfile } from "@utils/get-profile";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

const EditProduct: React.FC<Props> = async ({ params }) => {
  const seller = await getSellerProfile("/seller?auth-seller=login");

  const products = await filterDocs("products", where("uuid", "==", params.id));

  let _product = products[0] as Product;

  if (!_product)
    return <h2 className="text-center text-xl font-bold">Product Not Found</h2>;

  let product = await fetchProductDetails(_product);

  if (product.owner.uuid !== seller?.uuid) redirect("/seller");

  return (
    <div>
      <EditProductForm {...{ product }} />
    </div>
  );
};

export default EditProduct;
