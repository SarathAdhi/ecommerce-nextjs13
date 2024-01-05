import React from "react";
import * as y from "yup";
import { Input } from "@components/ui/input";
import { useFormik } from "formik";
import { addDoc, updateDoc } from "@backend/lib";
import { toast } from "react-hot-toast";
import { Button } from "@components/ui/button";
import { Product } from "types/product";
import { Textarea } from "@components/ui/textarea";
import InputFile from "@components/ui/InputFile";
import Grid from "@components/Grid";
import { doc } from "firebase/firestore";
import { reviewCollectionRef, sellerCollectionRef } from "@backend/db";
import { puuid } from "@utils/uuid";
import { categories } from "@utils/constants";
import { useAppStore } from "@utils/store";
import { Select } from "@components/ui/select";
import { productLink } from "@utils/product-link";
import { useRouter } from "next/navigation";

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

export const generalFormInitialValues = {
  uuid: puuid() as string,
  pname: "",
  description: "",
  category: categories[0].value,
  quantity: 0,
  price: 0,
  discount: 0,
  images: null,
};

type Props = {
  product?: Omit<
    Product<Seller>,
    "owner" | "imagePath" | "reviews" | "reviewId"
  >;
  isUpdate?: boolean;
  category: string;
};

const GeneralProductForm: React.FC<Props> = ({
  product,
  isUpdate = product ? true : false,
  category,
}) => {
  const { seller } = useAppStore();
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: { ...generalFormInitialValues, category, ...product },
    validationSchema: schema,
    onSubmit: async (values) => {
      const { images, ...rest } = values;

      if (isUpdate) {
        try {
          await updateDoc("products", product?.id!, {
            ...values,
          });

          toast.success("Product updated");
        } catch (error) {
          toast.error("Something went wrong");
        }

        return;
      }

      try {
        const { id } = await addDoc("reviews", {
          reviews: [],
        });

        const reviewRef = doc(reviewCollectionRef, id);

        await addDoc("products", {
          ...rest,
          reviewId: reviewRef,
          imagePath: `products/${values.uuid}/`,
          owner: doc(sellerCollectionRef, seller?.id),
        });

        toast.success("Product Added");

        push(productLink(values.pname, values.uuid));
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

        <Select
          label="Product Category"
          name="category"
          placeholder="Select a category"
          items={categories}
          value={formik.values.category}
          onValueChange={(e) => formik.setFieldValue("category", e)}
          error={formik.errors.category}
          disabled
        />
      </Grid>

      <Grid>
        <Input
          label="Product Name"
          name="pname"
          placeholder="Samsung S20+"
          value={formik.values.pname}
          onChange={formik.handleChange}
          error={formik.errors.pname}
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
        path={`products/${formik.values.uuid}/`}
        setFieldValue={formik.setFieldValue}
        value={formik.values["images"]?.map((e) => e?.url)}
        initialImages={formik.values["images"]?.map((e) => ({
          source: e?.url,
          options: { type: "local" },
        }))}
        // callback={getProduct}
        allowMultiple
      />

      <Button>{isUpdate ? "Update" : "Add"} Product</Button>
    </form>
  );
};

export default GeneralProductForm;
