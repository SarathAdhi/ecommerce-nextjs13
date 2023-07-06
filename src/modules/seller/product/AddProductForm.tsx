"use client";

import React from "react";
import * as y from "yup";
import { Input } from "@components/ui/input";
import { useFormik } from "formik";
import { addDoc } from "@backend/lib";
import { toast } from "react-hot-toast";
import { Button } from "@components/ui/button";
import { Product } from "types/product";
import { Textarea } from "@components/ui/textarea";
import InputFile from "@components/ui/InputFile";
import Grid from "@components/Grid";
import { doc } from "firebase/firestore";
import { sellerCollectionRef } from "@backend/db";
import { uuid } from "@utils/uuid";
import { categories } from "@utils/constants";
import { useAppStore } from "@utils/store";
import { Select } from "@components/ui/select";

const schema = y.object().shape({
  uuid: y.string().required("Product ID is required"),
  pname: y.string().required("Product Name is required"),
  description: y.string().required("Description is required"),
  quantity: y.number().required("Product Quantity is required"),
  price: y.number().required("Product Price is required"),
  discount: y.number().required("Product Discount is required"),
  category: y.string().required("Product Category is required"),
  images: y
    .array()
    .min(1, "Minimum 1 image is required")
    .required("Product Images is required"),
});

const initialValues = {
  uuid: uuid() as string,
  pname: "",
  description: "",
  category: categories[0].value,
  quantity: 0,
  price: 0,
  discount: 0,
  images: null,
};

type Props = {
  product?: Product<Seller>;
  isUpdate?: boolean;
};

const EditProductForm: React.FC<Props> = () => {
  const { seller } = useAppStore();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      const { images, ...rest } = values;

      try {
        await addDoc("products", {
          ...rest,
          imagePath: `products/${values.uuid}/`,
          owner: doc(sellerCollectionRef, seller?.id),
        });

        toast.success("Product Added");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-end gap-4"
    >
      <Grid>
        <Input
          label="Product ID"
          name="uuid"
          value={formik.values.uuid}
          onChange={formik.handleChange}
          error={formik.errors.uuid}
          readOnly
        />

        <Input
          label="Product Name"
          name="pname"
          value={formik.values.pname}
          onChange={formik.handleChange}
          error={formik.errors.pname}
        />

        <Select
          label="Product Category"
          name="category"
          placeholder="Select a category"
          items={categories}
          value={formik.values.category}
          onValueChange={(e) => formik.setFieldValue("category", e)}
          error={formik.errors.category}
        />

        <Input
          label="Product Quantity"
          name="quantity"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.errors.quantity}
        />

        <Input
          label="Product Price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
          prefix="₹"
        />

        <Input
          label="Product Discount (%)"
          name="discount"
          type="number"
          value={formik.values.discount}
          onChange={formik.handleChange}
          error={formik.errors.discount}
          step={5}
          min={0}
          max={100}
        />
      </Grid>

      <Textarea
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={(e) => formik.setFieldValue("description", e.target.value)}
        error={formik.errors.description}
        rows={8}
      />

      <InputFile
        label="Product Images"
        name="images"
        path={`products/${initialValues.uuid}/`}
        setFieldValue={formik.setFieldValue}
        value={formik.values["images"]}
        // callback={getProduct}
        allowMultiple
      />

      <Button>{initialValues ? "Update" : "Add"}</Button>
    </form>
  );
};

export default EditProductForm;
