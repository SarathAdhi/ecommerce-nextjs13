"use client";

import React, { useState } from "react";
import GeneralProductForm from "./GeneralProductForm";
import { categories } from "@utils/constants";
import { Select } from "@components/ui/select";
import FashionProductForm from "./FashionProductForm";
import { Product } from "types/product";

type Props = {
  _category?: string;
  product?: Product<Seller> | undefined;
};

const AddProductForm: React.FC<Props> = ({
  _category = "",
  product = undefined,
}) => {
  const [category, setCategory] = useState(_category);

  return (
    <>
      {!category ? (
        <div className="mt-60 grid place-content-center">
          <Select
            label="Select a Product Category"
            placeholder="Select a category"
            items={categories}
            value={category}
            onValueChange={(e) => setCategory(e)}
          />
        </div>
      ) : (
        <>
          {category !== "fashion" && (
            <GeneralProductForm {...{ category, product }} />
          )}

          {category === "fashion" && <FashionProductForm {...{ product }} />}
        </>
      )}
    </>
  );
};

export default AddProductForm;
