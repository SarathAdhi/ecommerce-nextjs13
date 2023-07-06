import React from "react";
import AddProductForm from "@modules/seller/product/AddProductForm";
import { getSellerProfile } from "@utils/get-profile";

const AddProduct = async () => {
  await getSellerProfile("/seller?auth-seller=login");

  return (
    <div>
      <AddProductForm />
    </div>
  );
};

export default AddProduct;
